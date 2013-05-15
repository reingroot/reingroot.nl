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

    public function __construct()
    {
        parent::__construct();
        $this->css_background = 'odd';
    }

    public function index()
    {
        $data['css_background'] = $this->css_background;
        $data['enable_anchors'] = FALSE;

        $this->load->view('header', $data);
        $this->load->view('main-nav');
        $this->load->view('bio');
        $this->load->view('footer');
    }

    public function all()
    {
        $data['css_background'] = '';

        $this->load->helper(array('form'));
        $this->load->library('form_validation');

        $this->load->model('Portfolio_model', '', TRUE);
        $data["portfolio_items"] = $this->Portfolio_model->get_all_items();

        $this->load->helper(array('form'));
        $this->load->library('form_validation');
        $this->form_validation->set_error_delimiters('<li>', '</li>');

        $data["enable_anchors"] = TRUE;

        if ($this->form_validation->run('contact') == FALSE)
        {
            $this->load->view('header', $data);
            $this->load->view('main-nav', $data);
            $this->load->view('bio');
            $this->load->view('services');
            $this->load->view('portfolio', $data);
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

            $this->load->view('header', $data);
            $this->load->view('main-nav', $data);
            $this->load->view('bio');
            $this->load->view('services');
            $this->load->view('portfolio', $data);
            $this->load->view('contact_success');
            $this->load->view('footer');
        }

    }
}

/* End of file welcome.php */
/* Location: ./application/controllers/main.php */