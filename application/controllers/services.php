<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Services extends CI_Controller {

	public function index()
	{
		$this->load->view('header');
		$this->load->view('main-nav');
		$this->load->view('services');
		$this->load->view('footer');
	}

	public function ajax()
	{
		$this->load->view('services');
	}
}

/* End of file welcome.php */
/* Location: ./application/controllers/services.php */