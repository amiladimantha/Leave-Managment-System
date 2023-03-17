# Introduction 
TODO: Give a short introduction of your project. Let this section explain the objectives or the motivation behind this project. 

# Getting Started
TODO: Guide users through getting your code up and running on their own system. In this section you can talk about:
1.	Installation process
2.	Software dependencies
3.	Latest releases
4.	API references

# Build and Test
TODO: Describe and show how to build your code and run the tests. 

# Contribute
TODO: Explain how other users and developers can contribute to make your code better. 

If you want to learn more about creating good readme files then refer the following [guidelines](https://docs.microsoft.com/en-us/azure/devops/repos/git/create-a-readme?view=azure-devops). You can also seek inspiration from the below readme files:
- [ASP.NET Core](https://github.com/aspnet/Home)
- [Visual Studio Code](https://github.com/Microsoft/vscode)
- [Chakra Core](https://github.com/Microsoft/ChakraCore)




the database name is "usermg"
in the appsettings.json "Server=[your device sql server name];Database=usermg;Trusted_Connection=True;" replace the server name of your devices sql server.

The SQL commands to create the database tables.

# ******************************
create database usermg;

use usermg;

create table Registration(
ID int identity(1,1) primary key,
Name varchar(100),
Email varchar(100),
Password varchar(100),
Phone varchar(100),
IsActive int,
IsApproved int,
AccountType int,
Birthday Datetime,
Address varchar(500),
Image varchar(100)
);

create table Leaves(
ID int identity(1,1) primary key,
CreatorID int,
CreatorName varchar(100),
FromDate Datetime,
ToDate Datetime,
NoofDays int,
LeaveType int,
IsApproved int,
FOREIGN KEY (CreatorID) REFERENCES Registration(ID)
);


create table ExtraLeaves(
ID int identity(1,1) primary key,
CreatorID int,
CreatorName varchar(100),
FromDate Datetime,
ToDate Datetime,
NoofDays int,
Reason varchar(1000),
IsApproved int,
FOREIGN KEY (CreatorID) REFERENCES Registration(ID)
);

# ******************************
create an admin account from here, 

insert into registration (name,email,password,phone,isactive,isapproved,accounttype,birthday,address) 
values ('admin','admin@gmail.com','password', '0773581169', 1,1,0,'1989-01-09 13:30:28.620','Kandy, SriLanka') 

or register an account from ui and set the accounttype as 0 using an sql query, this will make that account as the admin

#*******************************

Admin email : admin@gmail.com
Password : Admin123