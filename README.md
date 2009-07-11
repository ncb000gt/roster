Roster
=============

This module aims to be the defacto-standard for users and management of said users.
The concept is to provide specific APIs that allow an application to add, remove, edit, and verify user status.


Usage
=============

Throw the module in your <axiom_root>/modules directory.
Place the module in your app.properties file.

To use with your user/account objects.

YourUserPrototype/prototype.properties

`_extends = User`


When you add Roster to your application you'll be able to manage your Roster by going to http://localhost/roster/.
If you haven't logged in before, the default username and password is:

L: admin

P: changeme


Details
=============

To get more advanced password hashing you need to include the library [js-hashing](http://github.com/ncb000gt/js-hashing).
This adds SHA256 hashing of your passwords, automatic salting, and an iterative approach to the hashing (loop the hash recursively 'n' number of times).