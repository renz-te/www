<?php
require_once __DIR__.'/../models/Report.php';
class DashboardController {
    public function __construct(private Report $reports=new Report()){}
    public function show(): array { return ['stats'=>$this->reports->stats(),'categories'=>$this->reports->categoryStats(),'rate'=>$this->reports->resolutionRate()]; }
}
