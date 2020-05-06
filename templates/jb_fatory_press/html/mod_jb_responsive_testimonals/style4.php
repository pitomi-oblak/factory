<?php
/**  
 * Joomla Buff Responsive Testimonals
 * @package      mod_jb_responsive_testimonals
 * @copyright    Copyright (C) 2014 - 2019 JoomlaBuff http://joomlabuff.com. All rights reserved.
 * @license      GNU General Public License version 2 or later; see LICENSE.txt
 * @websites     http://joomlabuff.com
 * @support      Forum - http://joomlabuff.com/forum/index.html
 */
defined('_JEXEC') or die;

//assigning module id
$slider_id = 'jowl-module-jbmedia-style4-slider-'.$module->id;
 
$doc->addScript(JURI::root().'modules/mod_jb_responsive_testimonals/assets/owl-carousel/owl.carousel.min.js');
$doc->addStylesheet(JURI::root() . 'modules/mod_jb_responsive_testimonals/assets/js/google-code-prettify/prettify.css');
$doc->addStylesheet(JURI::root() . 'modules/mod_jb_responsive_testimonals/assets/owl-carousel/owl.carousel.css');
$doc->addStylesheet(JURI::root() . 'modules/mod_jb_responsive_testimonals/assets/owl-carousel/owl.theme.css');
$doc->addStylesheet(JURI::root() . 'modules/mod_jb_responsive_testimonals/assets/owl-carousel/owl.transitions.css');
$doc->addStylesheet(JURI::root() . 'modules/mod_jb_responsive_testimonals/assets/css/animate.css');

$count_items = $params->get('count_items',3);
$singleItem =($params->get('sinlgeitem',0)) ? 'true' : 'false';
$navigation = ($params->get('navigation',0)) ? 'true' : 'false';
$autoplay = ($params->get('autoscroll',1)) ? 'true' : 'false';
$pagination = ($params->get('pagination',0)) ? 'true' : 'false';
$slideSpeed = $params->get('slidespeed',200);
$pagination_speed = $params->get('pagination_speed',800);
$paginationNumber = ($params->get('paginationNumber',0)) ? 'true' : 'false';
if($singleItem == 1) {
	$count_items =  1;
} 
$transition_style =  $params->get('transition_type','fade');
  
$moduleIntro = $params->get ('module-intro');?>

<?php if($moduleIntro) : ?>
	<div class="jb-intro"><?php echo $moduleIntro; ?></div>
<?php endif; ?>

<!-- Check your list is not empty -->
<?php if(empty($list) && count($list) <0 ) return false;?>
<script type="text/javascript">
jQuery(document).ready(function($) {
    var style3owl = $("#<?php echo $slider_id;?>");
   // $('.owl-item').addClass('animated bounceOutLeft');
    style3owl.owlCarousel({
    	    
    	 items: <?php echo (int)$count_items;?>, 
         navigation:<?php echo $navigation;?>, 
       //Pagination
		pagination : <?php echo $pagination;?>,
         paginationNumbers: <?php echo $paginationNumber;?>, 
         navigationText:[ "<i class='fa fa-angle-left'></i>",
 		"<i class='fa fa-angle-right'></i>"], 		
 	 
    });
  

  });
</script>

<div id="jb-responsive-testimonal-style4-<?php echo $module->id;?>" class="testimonial <?php echo $moduleclass_sfx; ?>">				
		<div class="jb-responsive-testimonal-item-wrapper ">
			
			<div class="single-testimonials">
				<div id="<?php echo $slider_id;?>" class="owl-carousel jb-responsive-testimonial-list">
					<?php foreach($list as $i => $item):?>	
						<div  id="jb-testimonial-list-image-<?php echo $module->id;?>-<?php echo $i;?>" class="jbt-avatar item" >
				
							<div class="review-text">
								<p><?php echo $item->quote; ?></p>
							</div>
					<div class="info-box">
						<div class="img-box">
							<img  
							class="jb-rt-image jb-rt-owl-image"
							data-li_id="jb-testimonial-list-image-<?php echo $module->id;?>-<?php echo $i;?>" 
							data-quote_id="jb-testimonial-quote-wrapper-<?php echo $module->id;?>-<?php echo $i;?>"
							title="<?php echo $item->name;?>" src="<?php echo $item->image;?>" alt="<?php echo $item->name;?>" />
			 			
						</div>
						<div class="content-box">
							<h3><span class="name"><?php echo $item->name;?></span> -  <?php echo $item->company ;?></h3>
							<ul class="star">
								<li><i class="fa fa-star"></i></li>
								<li><i class="fa fa-star"></i></li>
								<li><i class="fa fa-star"></i></li>
								<li><i class="fa fa-star"></i></li>
								<li><i class="fa fa-star"></i></li>
							</ul>
						</div>
					</div>
				</div>
			<?php endforeach;?>
		</div>
	</div>
  </div>
</div>
 


