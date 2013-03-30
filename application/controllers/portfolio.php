<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Portfolio extends CI_Controller {

    public function __construct()
    {
        parent::__construct();
        $this->css_background = 'odd';
    }

	public function index()
	{
	    $data['css_background'] = $this->css_background;

		$this->load->model('Portfolio_model', '', TRUE);
		$data["portfolio_items"] = $this->Portfolio_model->get_all_items();

		$this->load->view('header', $data);
		$this->load->view('main-nav');
		$this->load->view('portfolio', $data);
		$this->load->view('footer');

	}

	public function item($item_slug = "tweede-kamer")
	{
		//$this->output->enable_profiler(TRUE);
		$data['css_background'] = 'portfolio-item';

		$this->load->helper('custom');
		$this->load->model('Portfolio_model', '', TRUE);
		$data["portfolio_item"] = $this->Portfolio_model->get_item($item_slug);
		$data["navigation_items"] = $this->Portfolio_model->get_navigation($data["portfolio_item"]["id"]);

		$this->load->view('header', $data);
		$this->load->view('main-nav');
		$this->load->view('portfolio_item', $data);
		$this->load->view('footer');

	}

	public function ajax_portfolio()
	{
		$this->load->model('Portfolio_model', '', TRUE);
		$data["portfolio_items"] = $this->Portfolio_model->get_all_items();

		$this->load->view('portfolio', $data);
	}

	public function ajax_portfolio_item()
	{
		$this->load->model('Portfolio_model', '', TRUE);


		$this->load->view('portfolio_item');
	}
}

/* End of file welcome.php */
/* Location: ./application/controllers/cases.php */