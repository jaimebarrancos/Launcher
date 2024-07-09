export const idlFactory = ({ IDL }) => {
  const Method = IDL.Text;
  const HeaderField = IDL.Tuple(IDL.Text, IDL.Text);
  const HttpRequest = IDL.Record({
    'url' : IDL.Text,
    'method' : Method,
    'body' : IDL.Vec(IDL.Nat8),
    'headers' : IDL.Vec(HeaderField),
  });
  const StatusCode = IDL.Nat16;
  const HttpResponse = IDL.Record({
    'body' : IDL.Vec(IDL.Nat8),
    'headers' : IDL.Vec(HeaderField),
    'status_code' : StatusCode,
  });
  const Result_1 = IDL.Variant({ 'ok' : IDL.Null, 'err' : IDL.Text });
  const Mood = IDL.Text;
  const WriteError = IDL.Variant({
    'MoodTooLong' : IDL.Null,
    'NotAllowed' : IDL.Null,
    'NameTooLong' : IDL.Null,
    'MemoryFull' : IDL.Null,
    'NotEnoughCycles' : IDL.Null,
  });
  const Result_2 = IDL.Variant({ 'ok' : IDL.Null, 'err' : WriteError });
  const FriendRequest = IDL.Record({
    'id' : IDL.Nat,
    'name' : IDL.Text,
    'sender' : IDL.Principal,
    'message' : IDL.Text,
  });
  const Friend = IDL.Record({
    'name' : IDL.Text,
    'canisterId' : IDL.Principal,
  });
  const Name = IDL.Text;
  const FriendRequestError = IDL.Variant({
    'AlreadyRequested' : IDL.Null,
    'AlreadyFriend' : IDL.Null,
    'NotEnoughCycles' : IDL.Null,
  });
  const FriendRequestResult = IDL.Variant({
    'ok' : IDL.Null,
    'err' : FriendRequestError,
  });
  const MessageError = IDL.Variant({
    'NotAllowed' : IDL.Null,
    'MemoryFull' : IDL.Null,
    'NotEnoughCycles' : IDL.Null,
    'MessageTooLong' : IDL.Null,
  });
  const Result = IDL.Variant({ 'ok' : IDL.Null, 'err' : MessageError });
  const UserCanister = IDL.Service({
    'http_request' : IDL.Func([HttpRequest], [HttpResponse], ['query']),
    'reboot_user_clearAllMessages' : IDL.Func([], [Result_1], []),
    'reboot_user_clearMessage' : IDL.Func([IDL.Nat], [Result_1], []),
    'reboot_user_dailyCheck' : IDL.Func([Mood], [Result_2], []),
    'reboot_user_getFriendRequests' : IDL.Func(
        [],
        [IDL.Vec(FriendRequest)],
        ['query'],
      ),
    'reboot_user_getFriends' : IDL.Func([], [IDL.Vec(Friend)], []),
    'reboot_user_handleFriendRequest' : IDL.Func(
        [IDL.Nat, IDL.Bool],
        [Result_1],
        [],
      ),
    'reboot_user_isAlive' : IDL.Func([], [IDL.Bool], ['query']),
    'reboot_user_readMessages' : IDL.Func(
        [],
        [IDL.Vec(IDL.Tuple(IDL.Nat, Name, IDL.Text))],
        [],
      ),
    'reboot_user_receiveFriendRequest' : IDL.Func(
        [IDL.Text, IDL.Text],
        [FriendRequestResult],
        [],
      ),
    'reboot_user_receiveMessage' : IDL.Func([IDL.Text], [Result], []),
    'reboot_user_removeFriend' : IDL.Func([IDL.Principal], [Result_1], []),
    'reboot_user_sendFriendRequest' : IDL.Func(
        [IDL.Principal, IDL.Text],
        [FriendRequestResult],
        [],
      ),
    'reboot_user_sendMessage' : IDL.Func(
        [IDL.Principal, IDL.Text],
        [Result],
        [],
      ),
    'reboot_user_version' : IDL.Func(
        [],
        [IDL.Nat, IDL.Nat, IDL.Nat],
        ['query'],
      ),
  });
  return UserCanister;
};
export const init = ({ IDL }) => { return [IDL.Text]; };
