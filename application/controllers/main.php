<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Main extends CI_Controller {

	/**
	 * Index Page for this controller.
	 *
	 * Maps to the following URL
	 * 		http://example.com/index.php/main
	 *	- or -  
	 * 		http://example.com/index.php/main/index
	 *	- or -
	 * Since this controller is set as the default controller in 
	 * config/routes.php, it's displayed at http://example.com/
	 *
	 * So any other public methods not prefixed with an underscore will
	 * map to /index.php/main/<method_name>
	 * @see http://codeigniter.com/user_guide/general/urls.html
	 */
	public function index()
	{
		$this->load->view('header');
		$this->load->view('main-nav');
		$this->load->view('bio');
		$this->load->view('footer');
	}

	public function all()
	{
		$this->load->model('Portfolio_model', '', TRUE);
		$data["portfolio_items"] = $this->Portfolio_model->get_all_items();

		$this->load->view('header');
		$this->load->view('main-nav');
		$this->load->view('bio');
		$this->load->view('services');
		$this->load->view('portfolio', $data);
		$this->load->view('contact');
		$this->load->view('footer');
	}
}

/* End of file welcome.php */
/* Location: ./application/controllers/main.php */