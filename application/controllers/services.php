<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Services extends CI_Controller {

    public function __construct()
    {
        parent::__construct();
        $this->css_background = 'even';
    }

	public function index()
	{
	    $data['css_background'] = $this->css_background;

		$this->load->view('header', $data);
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