<?php
class Database {
    private string $host = '127.0.0.1';
    private string $db = 'resolveed';
    private string $user = 'root';
    private string $pass = '';
    public function connect(): PDO {
        try {
            return new PDO(
                "mysql:host={$this->host};dbname={$this->db};charset=utf8mb4",
                $this->user,
                $this->pass,
                [PDO::ATTR_ERRMODE=>PDO::ERRMODE_EXCEPTION, PDO::ATTR_DEFAULT_FETCH_MODE=>PDO::FETCH_ASSOC]
            );
        } catch (PDOException $e) {
            die('Database connection failed. Check config/Database.php and make sure MySQL is running.');
        }
    }
}
