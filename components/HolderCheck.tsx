import { Component, MouseEvent } from "react"
import styles from '../styles/Home.module.css'
import { StargateClient, Coin } from "@cosmjs/stargate"
import { Window as KeplrWindow } from "@keplr-wallet/types";
import { CosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { AccountData } from "@keplr-wallet/types";

interface HolderCheckState {
    address: string
    balance: string
    tokens: Array<Number>
}

export interface HolderCheckProps {
    rpcUrl: string
    nft: string
}

export class HolderCheck extends Component<HolderCheckProps, HolderCheckState> {
    // Set the initial state
    constructor(props:HolderCheckProps) {
        super(props)
        this.state = {
            address: "Click first",
            balance: "Click first",
            tokens: [],
        }
    }

    // When the user clicks the "send to faucet button"
    onConnectClicked = async(e: MouseEvent<HTMLButtonElement>) => {
        const { keplr } = window
        if (!keplr) {
            alert("You need to install Keplr")
            return
        }

        // Get the current state and amount of tokens that we want to transfer
        const { rpcUrl, nft } = this.props

        const offlineSigner = window.getOfflineSigner!("stargaze-1")
        const account: AccountData = (await offlineSigner.getAccounts())[0];

        console.log("found account", account.address);
        const client = await StargateClient.connect(rpcUrl);
        const ustars = Number((await client.getBalance(account.address, "ustars")).amount);

        const cosmClient = await CosmWasmClient.connect(rpcUrl);
        const query = {"tokens": {"owner": account.address}};
        const res = await cosmClient.queryContractSmart(nft, query);

        this.setState({
            address: account.address,
            balance: (ustars / 1000000).toString() + " $STARS",
            tokens: res.tokens
        })
    }

    // The render function that draws the component at init and at state change
    render() {
        const { address, balance, tokens } = this.state
        // The web page structure itself
        return <div>
            <fieldset className={styles.card}>
                <p>Address: {address}</p>
                <p>Balance: {balance}</p>
                <p>Androma Punks: {tokens.length}</p>
            </fieldset>

            <fieldset className={styles.card}>
                <button onClick={this.onConnectClicked}>Connect...</button>
            </fieldset>
        </div>
    }
}

declare global {
    interface Window extends KeplrWindow {}
}
