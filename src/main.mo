import Result "mo:base/Result";
import Cycles "mo:base/ExperimentalCycles";
import Blob "mo:base/Blob";
import Text "mo:base/Text";
import types "./types";
import ManagementInterface "ic-management-interface";
import LedgerInterface "./ic-ledger-interface";
import Principal "mo:base/Principal";

actor Deployer {

    // ------- type declarations -------
    type WriteError = types.WriteError;
    type Result<Ok, Err> = types.Result<Ok, Err>;
    type Registry = types.Registry;
    type Dao = types.Dao;

    // ------- variable declarations -------
    let registry : Registry = actor ("avqkn-guaaa-aaaaa-qaaea-cai");
    let management : ManagementInterface.Self = actor("aaaaa-aa");
    let ledger : LedgerInterface.Self = actor("aaaaa-aa");

    let dao : Dao = actor ("br5f7-7uaaa-aaaaa-qaaca-cai");
    let fee : Nat = 1_000_000_000; // in cycles
    var launched = 0;
    // ------- functions -------

    // log the amount of created people
    public func reboot_amountOfPeople() : async Nat {
        return launched;
    };

    public shared ({caller}) func getPrincipal() : async Text {
        return "Your PrincipalId is: " # Principal.toText(caller);
    };

    public shared ({caller}) func reboot_deployYou(name : Text) : async Result<Principal, Text> {
        launched += 1;
        switch (await ledger.icrc2_transfer_from({
                spender_subaccount = null;
                from = {owner = caller; subaccount = null};
                to = {owner = Principal.fromActor(Deployer); subaccount = null};
                amount = 5;
                spender = dao;
                fee = null;
                memo = null;
                created_at_time = null;
            })) {
            case (#Ok(_)) {};
            case (#Err(err)) {
                return #err("Failed to transfer token.");
            };
        };

        //transfer one token to the new user
        switch (await dao.mint(caller)) {
            case (#ok(())) {};
            case (#err(err)) {
                return #err(err);
            };
        };

        // get module
        let mod = switch (await registry.reboot_registry_getModule("you", "0")) {
            case (#ok(mod)) {mod};
            case (#err(err)) {
                return #err(err);
            };
        };

        Cycles.add<system>(1_000_000_000_000);

        // create canister
        let canister_id = try {
            await management.create_canister({settings = null});
        } catch (_) {            
            return #err("Failed to create canister. (Not enough cycles?)");            
        };

        try {
            await management.install_code({
                arg = Blob.toArray(to_candid (name));
                wasm_module = Blob.toArray(mod.wasm);
                mode = #install;
                canister_id = canister_id.canister_id;
            });
        } catch (err) {
            return #err("Failed to install wasm.");            
        };

        // start the canister
        try {
            await management.start_canister(canister_id)
        } catch (err) {
            return #err("Failed to start the canister.");            
        };
        
        return #ok(canister_id.canister_id);
    };


    public shared func reboot_deployModule(name : Text, version : Text) : async Result<(), WriteError> {
        let availableCycles = Cycles.available();
        let acceptedCycles = Cycles.accept<system>(availableCycles);
        if (acceptedCycles < fee) {
            return #err(#NotEnoughCycles);
        };

        // get module
        let mod = switch (await registry.reboot_registry_getModule(name, version)) {
            case (#ok(mod)) {mod};
            case (#err(_)) {
                return #err(#FailedToGetModule);
            };
        };

        // create canister
        let canister_id = try {
            await management.create_canister({settings = null});
        } catch (_) {
            return #err(#FailedToCreateCanister);
        };

        // install wasm in canister
        try {
            await management.install_code({
                arg = Blob.toArray(Text.encodeUtf8(name));
                wasm_module = Blob.toArray(mod.wasm);
                mode = #install;
                canister_id = canister_id.canister_id;
            });
        } catch (_) {
            return #err(#FailedToCreateCanister);
        };

        // start the canister
        try {
            await management.start_canister(canister_id)
        } catch (_) {
            return #err(#FailedToCreateCanister);
        };
        
        return #ok(());
    };
};
