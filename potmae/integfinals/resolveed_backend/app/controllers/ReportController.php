<?php
require_once __DIR__.'/../models/Report.php';
require_once __DIR__.'/../models/User.php';
class ReportController {
    private Report $reports; private User $users;
    public function __construct(){ $this->reports=new Report(); $this->users=new User(); }
    public function create(): void {
        requireRole('student');
        if($_SERVER['REQUEST_METHOD']!=='POST') return;
        $title=trim($_POST['title']??'');$desc=trim($_POST['description']??'');$cat=$_POST['category']??'Other';$pri=$_POST['priority']??'medium';$loc=trim($_POST['location']??'');
        if(!$title||!$desc){flash('error','Please complete the report form.');redirect('index.php?page=report');}
        $file=uploadEvidence(); $this->reports->create(['title'=>$title,'description'=>$desc,'category'=>$cat,'priority'=>$pri,'location'=>$loc,'evidence'=>$file,'reported_by'=>$_SESSION['user']['id']]);
        flash('success','Report submitted successfully!'); redirect('index.php?page=mine');
    }
    public function delete(): void {
        requireRole('admin');
        if($_SERVER['REQUEST_METHOD']!=='POST') return;
        $id=(int)($_POST['id']??0);
        $report=$this->reports->find($id);
        if(!$report){flash('error','Report not found.');redirect('index.php?page=manage');}
        if($this->reports->delete($id)){
            if(!empty($report['evidence'])){
                $file=__DIR__.'/../../public/uploads/'.basename($report['evidence']);
                if(is_file($file)) @unlink($file);
            }
            flash('success','Report deleted successfully!');
        } else {
            flash('error','Unable to delete the report.');
        }
        redirect('index.php?page=manage');
    }
    public function update(): void {
        if(!in_array($_SESSION['user']['role'],['admin','staff'],true)){http_response_code(403);exit('Unauthorized');}
        if($_SERVER['REQUEST_METHOD']!=='POST') return;
        $id=(int)$_POST['id'];$r=$this->reports->find($id);if(!$r){flash('error','Report not found.');redirect('index.php?page=dashboard');}
        if($_SESSION['user']['role']==='staff' && (int)$r['assigned_to']!==(int)$_SESSION['user']['id']){http_response_code(403);exit('You can only update reports assigned to you.');}
        $assigned=$_POST['assigned_to']!==''?(int)$_POST['assigned_to']:null;
        if($_SESSION['user']['role']==='staff') $assigned=(int)$_SESSION['user']['id'];
        $this->reports->update($id,$_POST['status'],$_POST['priority'],$assigned,trim($_POST['action_taken']??''));
        flash('success','Report updated successfully!'); redirect('index.php?page='.($_SESSION['user']['role']==='admin'?'manage':'assigned'));
    }
}
