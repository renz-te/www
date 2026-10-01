RESOLVEED - FULL PHP/MYSQL BACKEND FOR LARAGON

1. Extract/copy the resolveed folder to:
   C:\laragon\www\resolveed

2. Start Laragon. Make sure Apache and MySQL are running.

3. Open phpMyAdmin from Laragon.

4. Import:
   database\resolveed.sql

5. Open:
   http://localhost/resolveed/public/

DEMO ACCOUNTS
Admin: admin / password
Staff: staff / password

ROLE RULES
Student:
- Can register/login
- Can report problems
- Can view own reports only
- Cannot see admin statistics

Staff:
- Can view only reports assigned to their account
- Can update status, priority and action taken on assigned reports
- Cannot manage all reports
- Cannot create student reports

Admin:
- Can manage all reports
- Can assign reports to staff
- Can view analytics
- Can view users
- Cannot submit reports
- Has no My Reports

FORGOT PASSWORD
Students register a security question/answer. Forgot Password verifies those details and allows the student to set a new password.

The backend uses PHP sessions, PDO prepared statements and password_hash/password_verify.
If your MySQL root account has a password, edit config\Database.php.
