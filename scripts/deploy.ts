import { parseUnits } from "ethers";  // ethers는 ethers 패키지에서 가져옴
import { ethers as hardhatEthers } from "hardhat";  // hardhat 확장 ethers는 별칭 사용
import { BigNumberish } from "ethers";

const tokens = (n: number): BigNumberish => {
  return parseUnits(n.toString(), "ether");  // ethers 패키지의 utils 사용
};

async function main() {

  console.log("start")

  //Hardhat의 테스트용 지갑 계정들을 배열 형태로 반환하고 그중 첫번째 계정을 배포계정으로 사용용
  const [deployer] = await hardhatEthers.getSigners()
  console.log(`Deploying contract with account: ${deployer.address}`)
  const NAME = "WEBSO"
  const SYMBOL = "WS"


  // 컴파일된 컨트랙트 파일을 찾아서 ABI(인터페이스)와 바이트코드를 로드한 후에 이더리움 네트워크와 상호작용할 수 있는 컨트랙트 팩토리생성
  console.log("✅ Loading contract factory...");
  const websocketCon = await hardhatEthers.getContractFactory("yundda")

  // 생성자 전달
  console.log("⏳ Deploying contract..."); 
  const yundda = await websocketCon.deploy(NAME, SYMBOL)

  //배포가 완료될 때 까지 기다림림
  console.log("⏳ Waiting for contract deployment...");
  await yundda.waitForDeployment()

  console.log(`Contract deployed to: ${await yundda.getAddress()}`);


}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

