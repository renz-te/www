<?php
require_once __DIR__.'/../../config/Database.php';
class User {
    private PDO $db;
    public function __construct(){ $this->db=(new Database())->connect(); }
    public function findByUsername(string $username): ?array {
        $s=$this->db->prepare('SELECT * FROM users WHERE username=? LIMIT 1'); $s->execute([$username]); return $s->fetch() ?: null;
    }
    public function create(string $name,string $username,string $password,string $question,string $answer): bool {
        $s=$this->db->prepare('INSERT INTO users(full_name,username,password,role,security_question,security_answer) VALUES(?,?,?,?,?,?)');
        return $s->execute([$name,$username,password_hash($password,PASSWORD_DEFAULT),'student',$question,password_hash(strtolower(trim($answer)),PASSWORD_DEFAULT)]);
    }
    public function all(): array { return $this->db->query("SELECT id,full_name,username,role,created_at FROM users ORDER BY created_at DESC")->fetchAll(); }
    public function staff(): array { return $this->db->query("SELECT id,full_name,username FROM users WHERE role='staff' ORDER BY full_name")->fetchAll(); }
    public function updatePasswordByUsername(string $username,string $password): bool {
        $s=$this->db->prepare('UPDATE users SET password=? WHERE username=? AND role=\'student\''); return $s->execute([password_hash($password,PASSWORD_DEFAULT),$username]);
    }
    public function verifyRecovery(string $username,string $question,string $answer): bool {
        $u=$this->findByUsername($username); if(!$u || $u['role']!=='student' || $u['security_question']!==$question) return false;
        return password_verify(strtolower(trim($answer)), $u['security_answer']);
    }
    public function questions(): array { return ['What is your favorite color?','What is the name of your first pet?','What is your favorite food?']; }
}
