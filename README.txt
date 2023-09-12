

The database name is "usermg"
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
