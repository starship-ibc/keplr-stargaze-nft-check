import type { NextPage } from 'next'
import { HolderCheck } from '../components/HolderCheck'

const Home: NextPage = () => {
  return <HolderCheck
    rpcUrl="rpc-stargaze-ia.cosmosia.notional.ventures"
    nft="stars1djsnl4adr8ayu8daerq0rs267rehjrqr4pde68e58qmyfrrsekkspvfelv" />
}

export default Home
