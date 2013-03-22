<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Portfolio extends CI_Controller {

	public function index()
	{
		$this->load->model('Portfolio_model', '', TRUE);
		$data["portfolio_items"] = $this->Portfolio_model->get_all_items();

		$this->load->view('header');
		$this->load->view('main-nav');
		$this->load->view('portfolio', $data);
		$this->load->view('footer');

	}

	public function item($item_slug = "tweede-kamer")
	{
		$this->load->helper('custom');
		$this->load->model('Portfolio_model', '', TRUE);
		$data["portfolio_item"] = $this->Portfolio_model->get_item($item_slug);
		$this->Portfolio_model->get_navigation($data["portfolio_item"]["id"]);


		$this->load->library('pagination');
		$config['base_url'] = base_url('portfolio/item');
		$config['display_pages'] = FALSE;
		$config['next_link'] = 'Next &gt;';
		$config['next_tag_open'] = '<li>';
		$config['next_tag_close'] = '</li>';
		$config['prev_link'] = '&lt; Previous';
		$config['prev_tag_open'] = '<li>';
		$config['prev_tag_close'] = '</li>';
		$config['last_link'] = FALSE;
		$config['first_link'] = FALSE;
		$config['total_rows'] = 6;
		$config['per_page'] = 1;

		$this->pagination->initialize($config);

		$this->load->view('header');
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