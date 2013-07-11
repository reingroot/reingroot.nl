<?php
class Portfolio_model extends CI_Model {

    function __construct()
    {
        parent::__construct();
    }

	/**
	 * @param string $current_item_id
	 */
	function get_navigation($current_item_id="")
	{
		if (! $current_item_id == "")
		{
			$this->db->select('id,slug');
			$this->db->from('portfolio_items');
			$this->db->where('`id` = (select min(`id`) FROM `portfolio_items` where `id` > '.$current_item_id.')');
			$this->db->or_where('`id` = (select max(`id`) FROM `portfolio_items` where `id` < '.$current_item_id.')');
            $this->db->order_by('`id`', 'ASC');

			$query = $this->db->get();

			$navigation_items = $query->result_array();

			// If the current item is the last or the first item in the table, then we'll have to get the opposite item so the user can always navigate through the items in a loop
			if (count($navigation_items) == 1)
			{
				if ($navigation_items[0]['id'] > $current_item_id)
				{
					$this->db->select('`id`, `slug`');
					$this->db->from('portfolio_items');
					$this->db->where('active',1);
					$this->db->order_by('id', 'DESC');
					$this->db->limit(1);

					$query = $this->db->get();

					$last_item = $query->row_array();

					array_unshift($navigation_items, $last_item);

				} else if ($navigation_items[0]['id'] < $current_item_id) {
					$this->db->select('`id`, `slug`');
					$this->db->from('portfolio_items');
					$this->db->where('active',1);
					$this->db->order_by('id', 'ASC');
					$this->db->limit(1);

					$query = $this->db->get();

					$first_item = $query->row_array();

					array_push($navigation_items, $first_item);
				}
			}

			return $navigation_items;

		} else {

		}
	}

	/**
	 * @return mixed
	 */
	function get_all_items()
	{
		$this->db->select('*');
		$this->db->from('portfolio_items');
		$this->db->where('active',1);
        $this->db->order_by('`id`', 'ASC');

		$query = $this->db->get();

		if ($query->num_rows() > 0)
		{
			$portfolio_items = $query->result_array();

			// get the images that go with this portfolio item
			foreach ($portfolio_items as &$item)
			{
				$this->db->select('*');
				$this->db->from('images');
				$this->db->join('portfolio_items_images', 'portfolio_items_images.image_id = images.id');
				$this->db->where('portfolio_items_images.portfolio_item_id', $item['id']);

				$query = $this->db->get();

				$item['images'] = $query->result_array();
			}

			// get the services used that go with this portfolio item
			foreach ($portfolio_items as &$item)
			{
				$this->db->select('*');
				$this->db->from('services_used');
				$this->db->join('portfolio_items_services_used', ' portfolio_items_services_used.service_used_id = services_used.id');
				$this->db->where('portfolio_items_services_used.portfolio_item_id', $item['id']);

				$query = $this->db->get();

				$item['services_used'] = $query->result_array();
			}

			return $portfolio_items;
		} else {
			return "No portfolio items where found";
		}
	}

	/**
	 * @param string $item_slug
	 */
	function get_item($item_slug = "")
	{
		$this->db->select('*');
		$this->db->from('portfolio_items');
		if (! $item_slug == "")
		{
			$this->db->where('portfolio_items.slug', $item_slug);
		}
		$this->db->limit(1);

		$query = $this->db->get();

		if ($query->num_rows() > 0)
		{
			$portfolio_item = $query->row_array();

			// get the images that go with this portfolio item
			$this->db->select('*');
			$this->db->from('images');
			$this->db->join('portfolio_items_images', 'portfolio_items_images.image_id = images.id');
			$this->db->where('portfolio_items_images.portfolio_item_id', $portfolio_item['id']);

			$query = $this->db->get();

			$portfolio_item['images'] = $query->result_array();

			// get the services used that go with this portfolio item
			$this->db->select('*');
			$this->db->from('services_used');
			$this->db->join('portfolio_items_services_used', ' portfolio_items_services_used.service_used_id = services_used.id');
			$this->db->where('portfolio_items_services_used.portfolio_item_id', $portfolio_item['id']);

			$query = $this->db->get();

			$portfolio_item['services_used'] = $query->result_array();

			return $portfolio_item;
		} else {
			return "No portfolio item was found";
		}
	}
}