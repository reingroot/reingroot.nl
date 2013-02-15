<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Portfolio extends CI_Controller {

	public function index()
	{
		$this->load->view('header');
		$this->load->view('main-nav');
		$this->load->view('portfolio');
		$this->load->view('footer');
	}

	public function ajax()
	{
		$this->load->view('cases');
	}
}

/* End of file welcome.php */
/* Location: ./application/controllers/cases.php */