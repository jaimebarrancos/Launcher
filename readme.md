# Launcher
The launcher is the first project to connect people to the super dapp ecosystem as it will enable users to enter and interact with the network.

## Setup

1. deploy dao

```sh
dfx deploy dao --argument "(record {
 accounts = vec {};
 proposals = vec {};
 system_params = record {
     transfer_fee = record { amount_e8s = 0 };
     proposal_vote_threshold = record { amount_e8s = 1 };
     proposal_submission_deposit = record { amount_e8s = 1 };
 };
})"
```

2. deploy deployer with controler being DAO

```sh
dfx deploy deployer
dfx canister update-settings deployer --add-controller <DAO principal>
```

3. remove ownership of identity that deployed the deployer
```sh
dfx canister update-settings CANISTER_NAME --remove-controller CONTROLLER
```

4. deploy yourself
```sh
dfx canister call reboot_deployYou
```

## Test

1. start local dfx ```dfx start --clean```
2. deploy ledger canister ```dfx nns install```
3. transfer funds to the account you will sign in with nfid ```dfx ledger --network ic transfer 163dab6d525780f9907845558b5771a031aaa60129d1f9db7d45d4b5e989e5b6 --icp 500 --memo 1234```
4. start the local frontend server ```npm run start```