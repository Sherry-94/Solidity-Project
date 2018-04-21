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
    
    function User ()
    {
        owner = msg.sender;
    }
    struct UserStruct {
        string name;
    }
    function SetUser(address _account) OnlyOwner
    {
        AddedAccounts[_account] = true;
    }
    function AccountAdded(address _account) returns(bool)
    {
        emit HasBeenSet(_account,AddedAccounts[_account]);
        return AddedAccounts[_account];
    }
    
    function CreateUser(address _account, string _name) returns(bool)
    {
        if(AccountAdded(_account))
        {
            _Accounts[_account].name = _name;
            emit UserAdded(_account,_name, true);
            return true;
        }
    }
    
}