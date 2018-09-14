pragma solidity ^0.4.2;

contract User{
    mapping (address => bool) private AddedAccounts;
    mapping (address => UserStruct) private _Accounts;
    address private owner;
    event HasBeenSet(address _account, bool Val);
    event UserAdded(address _account,string Name, bool val);
    
    modifier OnlyOwner ()
    {
        require(msg.sender==owner);
        _;
    }   
    constructor () public
    {
        owner = msg.sender;
    }
    struct UserStruct {
        string name;
    }
    function SetUser(address _account) public OnlyOwner
    {
        AddedAccounts[_account] = true;
    }
    function AccountAdded(address _account)public returns(bool)
    {
        emit HasBeenSet(_account,AddedAccounts[_account]);
        return AddedAccounts[_account];
    }   
    function CreateUser(address _account, string _name) public returns(bool)
    {
        if(AccountAdded(_account))
        {
            _Accounts[_account].name = _name;
            emit UserAdded(_account,_name, true);
            return true;
        }
    }
    
}
