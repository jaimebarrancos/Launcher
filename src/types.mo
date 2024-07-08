import Result "mo:base/Result";

module {

    public type WriteError = {
        #NotEnoughCycles;
        #FailedToCreateCanister;
        #FailedToGetModule;
    };

    public type Result<Ok, Err> = Result.Result<Ok, Err>;

    public type Module = {
        id : Nat;
        name : Text;
        version : Text;
        wasm : Blob;
    };

    public type Registry = actor {
        reboot_registry_getModule : shared (name : Text, version : Text) -> async Result<Module, Text>;
    };

    public type Dao = actor {
        mint : shared (user : Principal) -> async Result<(), Text>;
    };
}