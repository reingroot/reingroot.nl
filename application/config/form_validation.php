<?php
$config = array(
				'contact' => array(
									array(
										'field'   => 'message',
										'label'   => 'message',
										'rules'   => 'prep_for_form|trim|required'
									),
									array(
										'field'   => 'name',
										'label'   => 'name',
										'rules'   => 'trim|required'
									),
									array(
										'field'   => 'email',
										'label'   => 'email',
										'rules'   => 'trim|required|valid_email'
									)
								)
				);
