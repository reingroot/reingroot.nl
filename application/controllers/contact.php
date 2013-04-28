<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Contact extends CI_Controller {

    public function __construct()
    {
        parent::__construct();
        $this->css_background = 'even';
    }

	public function index()
	{
	    $data['css_background'] = $this->css_background;

		$this->load->helper(array('form'));
		$this->load->library('form_validation');

		$this->form_validation->set_error_delimiters('<li>', '</li>');

		if ($this->form_validation->run('contact') == FALSE)
		{
			$this->load->view('header', $data);
			$this->load->view('main-nav');
			$this->load->view('contact');
			$this->load->view('footer');
		}
		else
		{
            $this->load->library('email');

            $this->email->from($this->input->post('email'), $this->input->post('name'));
            $this->email->to('welcome@reingroot.nl');

            $this->email->subject('ReinGroot.nl :: Contact form');
            $this->email->message($this->input->post('message'));

            $this->email->send();

            echo $this->email->print_debugger();

			$this->load->view('header', $data);
			$this->load->view('main-nav');
			$this->load->view('contact_success');
			$this->load->view('footer');
		}
	}
}

/* End of file welcome.php */
/* Location: ./application/controllers/contact.php */