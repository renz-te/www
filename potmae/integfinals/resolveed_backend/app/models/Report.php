<?php
require_once __DIR__.'/../../config/Database.php';
class Report {
    private PDO $db;
    public function __construct(){ $this->db=(new Database())->connect(); }
    public function create(array $d): int {
        $s=$this->db->prepare('INSERT INTO reports(title,description,category,priority,location,evidence,reported_by) VALUES(?,?,?,?,?,?,?)');
        $s->execute([$d['title'],$d['description'],$d['category'],$d['priority'],$d['location'],$d['evidence'],$d['reported_by']]); return (int)$this->db->lastInsertId();
    }
    public function mine(int $uid): array {
        $s=$this->db->prepare('SELECT r.*,s.full_name staff_name FROM reports r LEFT JOIN users s ON s.id=r.assigned_to WHERE r.reported_by=? ORDER BY r.created_at DESC'); $s->execute([$uid]); return $s->fetchAll();
    }
    public function assigned(int $uid): array {
        $s=$this->db->prepare('SELECT r.*,u.full_name reporter FROM reports r JOIN users u ON u.id=r.reported_by WHERE r.assigned_to=? ORDER BY FIELD(r.priority,\'critical\',\'high\',\'medium\',\'low\'),r.created_at DESC'); $s->execute([$uid]); return $s->fetchAll();
    }
    public function all(): array {
        return $this->db->query('SELECT r.*,u.full_name reporter,s.full_name staff_name FROM reports r JOIN users u ON u.id=r.reported_by LEFT JOIN users s ON s.id=r.assigned_to ORDER BY r.created_at DESC')->fetchAll();
    }
    public function find(int $id): ?array {
        $s=$this->db->prepare('SELECT r.*,u.full_name reporter,s.full_name staff_name FROM reports r JOIN users u ON u.id=r.reported_by LEFT JOIN users s ON s.id=r.assigned_to WHERE r.id=?'); $s->execute([$id]); return $s->fetch() ?: null;
    }
    public function update(int $id,string $status,string $priority,?int $assigned,string $action): bool {
        $s=$this->db->prepare("UPDATE reports SET status=?,priority=?,assigned_to=?,action_taken=?,resolution_date=IF(?='resolved',NOW(),NULL) WHERE id=?"); return $s->execute([$status,$priority,$assigned,$action,$status,$id]);
    }
    public function delete(int $id): bool {
        $s=$this->db->prepare('DELETE FROM reports WHERE id=?');
        return $s->execute([$id]);
    }
    public function stats(): array {
        $s=['total'=>0,'pending'=>0,'under_review'=>0,'in_progress'=>0,'resolved'=>0,'rejected'=>0,'critical'=>0];
        foreach($this->db->query('SELECT status,COUNT(*) c FROM reports GROUP BY status') as $r){$s['total']+=(int)$r['c']; if(isset($s[$r['status']]))$s[$r['status']]=(int)$r['c'];} $s['critical']=(int)$this->db->query("SELECT COUNT(*) FROM reports WHERE priority='critical'")->fetchColumn(); return $s;
    }
    public function categoryStats(): array { return $this->db->query('SELECT category,COUNT(*) total FROM reports GROUP BY category ORDER BY total DESC')->fetchAll(); }
    public function resolutionRate(): float { $x=$this->db->query("SELECT COUNT(*) total,SUM(status='resolved') resolved FROM reports")->fetch(); return ((int)$x['total']) ? round(((int)$x['resolved']/(int)$x['total'])*100,1) : 0; }
}
