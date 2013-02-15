<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Contact extends CI_Controller {

	public function index()
	{
		$this->load->view('header');
		$this->load->view('main-nav');
		$this->load->view('contact');
		$this->load->view('footer');
	}
}

/* End of file welcome.php */
/* Location: ./application/controllers/contact.php */