<?php
session_start();
require_once __DIR__.'/../app/controllers/AuthController.php';
require_once __DIR__.'/../app/controllers/ReportController.php';
require_once __DIR__.'/../app/models/Report.php';
require_once __DIR__.'/../app/models/User.php';
function e($v): string { return htmlspecialchars((string)$v,ENT_QUOTES,'UTF-8'); }
function redirect(string $url): never { header('Location: '.$url); exit; }
function flash(string $key, ?string $value=null): ?string { if($value!==null){$_SESSION['_flash'][$key]=$value;return null;} $v=$_SESSION['_flash'][$key]??null; unset($_SESSION['_flash'][$key]); return $v; }
function requireLogin(): void { if(empty($_SESSION['user'])) redirect('index.php?page=login'); }
function requireRole(string $role): void { requireLogin(); if($_SESSION['user']['role']!==$role){http_response_code(403);exit('Access denied.');} }
function uploadEvidence(): string {
 if(empty($_FILES['evidence']['name']) || $_FILES['evidence']['error']!==UPLOAD_ERR_OK) return '';
 $ext=strtolower(pathinfo($_FILES['evidence']['name'],PATHINFO_EXTENSION));
 if(!in_array($ext,['jpg','jpeg','png','webp'],true)){flash('error','Only JPG, PNG and WEBP evidence images are allowed.');redirect('index.php?page=report');}
 if($_FILES['evidence']['size']>5*1024*1024){flash('error','Evidence image must be 5MB or smaller.');redirect('index.php?page=report');}
 $name=bin2hex(random_bytes(12)).'.'.$ext; $dir=__DIR__.'/uploads'; if(!is_dir($dir))mkdir($dir,0775,true); move_uploaded_file($_FILES['evidence']['tmp_name'],$dir.'/'.$name); return $name;
}
$page=$_GET['page']??(isset($_SESSION['user'])?'dashboard':'login');
$auth=new AuthController(); $rc=new ReportController(); $rm=new Report(); $um=new User();
if($page==='login'){if($_SERVER['REQUEST_METHOD']==='POST')$auth->login();include __DIR__.'/../app/views/auth/login.php';exit;}
if($page==='register'){if($_SERVER['REQUEST_METHOD']==='POST')$auth->register();include __DIR__.'/../app/views/auth/register.php';exit;}
if($page==='forgot'){if($_SERVER['REQUEST_METHOD']==='POST')$auth->forgot();include __DIR__.'/../app/views/auth/forgot.php';exit;}
if($page==='logout'){$auth->logout();exit;}
requireLogin();
if($page==='dashboard'){
 $role=$_SESSION['user']['role'];
 if($role==='student'){$mine=$rm->mine($_SESSION['user']['id']);$recent=array_slice($mine,0,3);include __DIR__.'/../app/views/dashboard/student.php';exit;}
 if($role==='staff'){$assigned=$rm->assigned($_SESSION['user']['id']);$assignedCount=count($assigned);$inProgress=count(array_filter($assigned,fn($r)=>$r['status']==='in_progress'));$resolved=count(array_filter($assigned,fn($r)=>$r['status']==='resolved'));$critical=count(array_filter($assigned,fn($r)=>$r['priority']==='critical'));include __DIR__.'/../app/views/dashboard/staff.php';exit;}
 $stats=$rm->stats();$rate=$rm->resolutionRate();$critical=$stats['critical'];include __DIR__.'/../app/views/dashboard/admin.php';exit;
}
if($page==='report'){ $rc->create(); include __DIR__.'/../app/views/reports/form.php';exit; }
if($page==='mine'){requireRole('student');$reports=$rm->mine($_SESSION['user']['id']);$title='My Reports';include __DIR__.'/../app/views/reports/list.php';exit;}
if($page==='assigned'){requireRole('staff');$reports=$rm->assigned($_SESSION['user']['id']);$title='Assigned Reports';include __DIR__.'/../app/views/reports/list.php';exit;}
if($page==='manage'){requireRole('admin');$reports=$rm->all();$title='Manage All Reports';include __DIR__.'/../app/views/reports/list.php';exit;}
if($page==='view'){
 $report=$rm->find((int)($_GET['id']??0)); if(!$report)exit('Report not found.'); $role=$_SESSION['user']['role'];
 if($role==='student'&&(int)$report['reported_by']!==(int)$_SESSION['user']['id'])exit('Access denied.');
 if($role==='staff'&&(int)$report['assigned_to']!==(int)$_SESSION['user']['id'])exit('Access denied.');
 $staff=$um->staff(); include __DIR__.'/../app/views/reports/view.php'; exit;
}
if($page==='update'){$rc->update();exit;}
if($page==='analytics'){requireRole('admin');$stats=$rm->stats();$categories=$rm->categoryStats();$rate=$rm->resolutionRate();include __DIR__.'/../app/views/admin/analytics.php';exit;}
if($page==='users'){requireRole('admin');$users=$um->all();include __DIR__.'/../app/views/admin/users.php';exit;}
if($page==='about'){include __DIR__.'/../app/views/about.php';exit;}
redirect('index.php?page=dashboard');
