<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Temp extends CI_Controller {

	public function index()
	{
		$this->load->view('header');
		$this->load->view('temp');
		$this->load->view('footer');
	}

	public function ajax()
	{
		$this->load->view('temp');
	}
}

/* End of file welcome.php */
/* Location: ./application/controllers/temp.php */