<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Cases extends CI_Controller {

	public function index()
	{
		$this->load->helper('url');

		$this->load->view('header');
		$this->load->view('cases');
		$this->load->view('footer');
	}

	public function ajax()
	{
		$this->load->view('cases');
	}
}

/* End of file welcome.php */
/* Location: ./application/controllers/cases.php */