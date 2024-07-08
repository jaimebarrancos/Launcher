
### deploy the registry

### put you in the registry

### deploy dao
dfx deploy dao --argument "(record {
 accounts = vec {};
 proposals = vec {};
 system_params = record {
     transfer_fee = record { amount_e8s = 0 };
     proposal_vote_threshold = record { amount_e8s = 1 };
     proposal_submission_deposit = record { amount_e8s = 1 };
 };
})"


### deploy deployer with controler being DAO
dfx deploy deployer
dfx canister update-settings deployer --add-controller <DAO principal>

### remove ownership of identity that deployed the deployer
dfx canister update-settings CANISTER_NAME --remove-controller CONTROLLER

### deploy yourself
dfx canister call reboot_deployYou


