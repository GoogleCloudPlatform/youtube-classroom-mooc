module.exports = Object.freeze({
    CREATE_TABLES: 'create table if not exists students(id int primary key auto_increment,email varchar(255)not null,firstname varchar(255)not null,lastname varchar(255)not null);'+
                    'create table if not exists educators(id int primary key auto_increment,email varchar(255)not null,firstname varchar(255)not null,lastname varchar(255)not null);'+
                    'CREATE TABLE if not exists playlist (id int primary key auto_increment,title varchar(255) not null,educatorId int,FOREIGN KEY (educatorId) REFERENCES educators(id));',
})