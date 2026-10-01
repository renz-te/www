<?php
require_once __DIR__.'/../models/User.php';
class AuthController {
    private User $users;
    public function __construct(){ $this->users=new User(); }
    public function login(): void {
        if($_SERVER['REQUEST_METHOD']!=='POST') return;
        $u=trim($_POST['username']??''); $p=$_POST['password']??''; $x=$this->users->findByUsername($u);
        if($x && password_verify($p,$x['password'])){ session_regenerate_id(true); $_SESSION['user']=['id'=>(int)$x['id'],'name'=>$x['full_name'],'username'=>$x['username'],'role'=>$x['role']]; flash('success','Login successful.'); redirect('index.php?page=dashboard'); }
        flash('error','Invalid username or password.'); redirect('index.php?page=login');
    }
    public function register(): void {
        if($_SERVER['REQUEST_METHOD']!=='POST') return;
        $name=trim($_POST['full_name']??'');$u=trim($_POST['username']??'');$p=$_POST['password']??'';$q=$_POST['security_question']??'';$a=trim($_POST['security_answer']??'');
        if(strlen($p)<6||!$name||!$u||!$q||!$a){flash('error','Please complete all fields. Password must be at least 6 characters.');redirect('index.php?page=register');}
        if($this->users->findByUsername($u)){flash('error','Username already exists.');redirect('index.php?page=register');}
        $this->users->create($name,$u,$p,$q,$a); flash('success','Registration successful! Your account has been created. Please log in.'); redirect('index.php?page=login');
    }
    public function forgot(): void {
        if($_SERVER['REQUEST_METHOD']!=='POST') return;
        $u=trim($_POST['username']??'');$q=$_POST['security_question']??'';$a=trim($_POST['security_answer']??'');$p=$_POST['new_password']??'';$cp=$_POST['confirm_password']??'';
        if($p!==$cp){flash('error','New passwords do not match.');redirect('index.php?page=forgot');}
        if(strlen($p)<6){flash('error','Password must be at least 6 characters.');redirect('index.php?page=forgot');}
        if(!$this->users->verifyRecovery($u,$q,$a)){flash('error','The recovery information is incorrect.');redirect('index.php?page=forgot');}
        $this->users->updatePasswordByUsername($u,$p); flash('success','Password reset successful! You can now log in.'); redirect('index.php?page=login');
    }
    public function logout(): void { unset($_SESSION['user']); session_regenerate_id(true); redirect('index.php?page=login'); }
}
