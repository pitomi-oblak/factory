<?php
/**
 * @version		2.6.x
 * @package		K2
 * @author		JoomlaWorks http://www.joomlaworks.net
 * @copyright	Copyright (c) 2006 - 2014 JoomlaWorks Ltd. All rights reserved.
 * @license		GNU/GPL license: http://www.gnu.org/copyleft/gpl.html
 */

// no direct access
defined('_JEXEC') or die;


$document = JFactory::getDocument();
$app = JFactory::getApplication();
$current_tmpl = $app->getTemplate();

$document->addScript("templates/".$current_tmpl."/js/prettySocial.min.js");
$document->addScriptDeclaration("
	jQuery(document).ready(function($) {
		$('.prettySocial').prettySocial();
	});
	");

?>

<?php if(JRequest::getInt('print')==1): ?>
<!-- Print button at the top of the print page only -->
<a class="itemPrintThisPage" rel="nofollow" href="#" onclick="window.print();return false;">
	<span><?php echo JText::_('K2_PRINT_THIS_PAGE'); ?></span>
</a>
<?php endif; ?>

<!-- Start K2 Item Layout -->
<span id="startOfPageId<?php echo JRequest::getInt('id'); ?>"></span>

<div class="news-content single-news-page">
	<div class="single-blog-post">
		
	<div id="k2Container" class="itemView<?php echo ($this->item->featured) ? ' itemIsFeatured' : ''; ?><?php if($this->item->params->get('pageclass_sfx')) echo ' '.$this->item->params->get('pageclass_sfx'); ?>">
	
	<?php if($this->item->params->get('itemImage') && !empty($this->item->image)): ?>
		<!-- Item Image -->
		<div class="itemImageBlock">
			<span class="itemImage">
				<a data-k2-modal="image" href="<?php echo $this->item->imageXLarge; ?>" title="<?php echo JText::_('K2_CLICK_TO_PREVIEW_IMAGE'); ?>">
					<img src="<?php echo $this->item->image; ?>" alt="<?php if(!empty($this->item->image_caption)) echo K2HelperUtilities::cleanHtml($this->item->image_caption); else echo K2HelperUtilities::cleanHtml($this->item->title); ?>" style="width:<?php echo $this->item->imageWidth; ?>px; height:auto;" />
				</a>
			</span>

			<?php if($this->item->params->get('itemImageMainCaption') && !empty($this->item->image_caption)): ?>
			<!-- Image caption -->
			<span class="itemImageCaption"><?php echo $this->item->image_caption; ?></span>
			<?php endif; ?>

			<?php if($this->item->params->get('itemImageMainCredits') && !empty($this->item->image_credits)): ?>
			<!-- Image credits -->
			<span class="itemImageCredits"><?php echo $this->item->image_credits; ?></span>
			<?php endif; ?>

			<div class="clr"></div>
		</div>
		<?php endif; ?>

  <?php if($this->item->params->get('itemVideo') && !empty($this->item->video)): ?>
  <!-- Item video -->
  <a name="itemVideoAnchor" id="itemVideoAnchor"></a>

  <div class="itemVideoBlock">
	<?php if($this->item->videoType=='embedded'): ?>
		<div class="itemVideoEmbedded">
			<?php echo $this->item->video; ?>
		</div>
		<?php else: ?>
		<div class="itemVideo"><?php echo $this->item->video; ?></div>
		<?php endif; ?>

	  <?php if($this->item->params->get('itemVideoCaption') && !empty($this->item->video_caption)): ?>
	  <span class="itemVideoCaption"><?php echo $this->item->video_caption; ?></span>
	  <?php endif; ?>

	  <?php if($this->item->params->get('itemVideoCredits') && !empty($this->item->video_credits)): ?>
	  <span class="itemVideoCredits"><?php echo $this->item->video_credits; ?></span>
	  <?php endif; ?>

	  <div class="clr"></div>
  </div>
  <?php endif; ?>
	
		
	<div class="itemContent">
		<!-- Plugins: BeforeDisplay -->
		<?php echo $this->item->event->BeforeDisplay; ?>
	
		<!-- K2 Plugins: K2BeforeDisplay -->
		<?php echo $this->item->event->K2BeforeDisplay; ?>
	
		<div class="itemHeader">
			
			<div class="title_container">
				 <?php if($this->item->params->get('itemTitle')): ?>
				  <!-- Item title -->
				  <h2 class="itemTitle">
						<?php if(isset($this->item->editLink)): ?>
						<!-- Item edit link -->
						<span class="itemEditLink">
							<a class="modal" rel="{handler:'iframe',size:{x:990,y:550}}" href="<?php echo $this->item->editLink; ?>">
								<?php echo JText::_('K2_EDIT_ITEM'); ?>
							</a>
						</span>
						<?php endif; ?>
			
					<?php echo $this->item->title; ?>
			
					<?php if($this->item->params->get('itemFeaturedNotice') && $this->item->featured): ?>
					<!-- Featured flag -->
					<span>
						<sup>
							<?php echo JText::_('K2_FEATURED'); ?>
						</sup>
					</span>
					<?php endif; ?>
			
				  </h2>
				  <?php endif; ?>
		  </div>
	
		 
			<?php if(
			$this->item->params->get('itemFontResizer') ||
			$this->item->params->get('itemPrintButton') ||
			$this->item->params->get('itemEmailButton') ||
			$this->item->params->get('itemSocialButton') ||
			$this->item->params->get('itemVideoAnchor') ||
			$this->item->params->get('itemImageGalleryAnchor') ||
			$this->item->params->get('itemCommentsAnchor')
		): ?>
	<aside class="article-aside clearfix">
		
			
      <dl class="article-info  muted">
		  <dt></dt>
		<?php if($this->item->params->get('itemDateCreated')): ?>
			<!-- Date created -->
			<dd class="itemDateCreated">
				<i class="fa fa-calendar"></i>
				<?php echo JHTML::_('date', $item->created, JText::_('F, d Y')); ?>
			</dd>
			<?php endif; ?>
			  
      	<?php if($this->item->params->get('itemAuthor')): ?>
				<!-- Item Author -->
      	<dd title="" itemtype="http://schema.org/Person" itemscope="" itemprop="author" class="createdby hasTooltip" data-original-title="&lt;span class=sub-text&gt;by&lt;/span&gt;">
						<span class="sub-text"><i class="fa fa-user"></i></span>			
						<?php if(empty($this->item->created_by_alias)): ?>
						<a itemprop="url" rel="author" href="<?php echo $this->item->author->link; ?>"><?php echo $this->item->author->name; ?></a>
						<?php else: ?>
						<span itemprop="name"><?php echo $this->item->author->name; ?></span>
						<?php endif; ?>
				</dd>
				<?php endif; ?>
				
				<?php if($this->item->params->get('itemCategory')): ?>
				<dd title="" class="category-name hasTooltip" data-original-title="&lt;span class=sub-text&gt;Posted in&lt;/span&gt;">
						<span class="sub-text"><i class="fa fa-folder-open-o"></i></span>									
						<a href="<?php echo $this->item->category->link; ?>">
							<span itemprop="genre"><?php echo $this->item->category->name; ?></span>
						</a>				
				</dd>
				<?php endif; ?>
				
				<?php if($this->item->params->get('itemRating')): ?>
				<!-- Item Rating -->
				<dd class="itemRatingBlock">
					<span class="sub-text"><?php echo JText::_('K2_RATE_THIS_ITEM'); ?></span>
					<div class="itemRatingForm">
						<ul class="itemRatingList">
							<li class="itemCurrentRating" id="itemCurrentRating<?php echo $this->item->id; ?>" style="width:<?php echo $this->item->votingPercentage; ?>%;"></li>
							<li><a href="#" data-id="<?php echo $this->item->id; ?>" title="<?php echo JText::_('K2_1_STAR_OUT_OF_5'); ?>" class="one-star">1</a></li>
							<li><a href="#" data-id="<?php echo $this->item->id; ?>" title="<?php echo JText::_('K2_2_STARS_OUT_OF_5'); ?>" class="two-stars">2</a></li>
							<li><a href="#" data-id="<?php echo $this->item->id; ?>" title="<?php echo JText::_('K2_3_STARS_OUT_OF_5'); ?>" class="three-stars">3</a></li>
							<li><a href="#" data-id="<?php echo $this->item->id; ?>" title="<?php echo JText::_('K2_4_STARS_OUT_OF_5'); ?>" class="four-stars">4</a></li>
							<li><a href="#" data-id="<?php echo $this->item->id; ?>" title="<?php echo JText::_('K2_5_STARS_OUT_OF_5'); ?>" class="five-stars">5</a></li>
						</ul>
						<div id="itemRatingLog<?php echo $this->item->id; ?>" class="itemRatingLog"><?php echo $this->item->numOfvotes; ?></div>
						<div class="clr"></div>
					</div>
					<div class="clr"></div>
				</dd>
				<?php endif; ?>
				
				<?php if($this->item->params->get('itemCommentsAnchor') && $this->item->params->get('itemComments') && ( ($this->item->params->get('comments') == '2' && !$this->user->guest) || ($this->item->params->get('comments') == '1')) ): ?>
				<!-- Anchor link to comments below - if enabled -->
				<dd>
					<?php if(!empty($this->item->event->K2CommentsCounter)): ?>
						<!-- K2 Plugins: K2CommentsCounter -->
						<?php echo $this->item->event->K2CommentsCounter; ?>
					<?php else: ?>
						<?php if($this->item->numOfComments > 0): ?>
						<i class="fa fa-comment-o"></i>
						<a class="itemCommentsLink k2Anchor" href="<?php echo $this->item->link; ?>#itemCommentsAnchor">
							<span><?php echo $this->item->numOfComments; ?></span> <?php echo ($this->item->numOfComments>1) ? JText::_('K2_COMMENTS') : JText::_('K2_COMMENT'); ?>
						</a>
						<?php else: ?>
						<i class="fa fa-comment-o"></i>
						<a class="itemCommentsLink k2Anchor" href="<?php echo $this->item->link; ?>#itemCommentsAnchor">
							<?php echo JText::_('K2_BE_THE_FIRST_TO_COMMENT'); ?>
						</a>
						<?php endif; ?>
					<?php endif; ?>
				</dd>
				<?php endif; ?>
				
				<?php if($this->item->params->get('itemHits') || ($this->item->params->get('itemDateModified') && intval($this->item->modified)!=0)): ?>
					<dd class="itemContentFooter">
			
						<?php if($this->item->params->get('itemHits')): ?>
						<!-- Item Hits -->
						<span class="itemHits">
							<i class="fa fa-eye"></i> <?php echo $this->item->hits; ?> <?php echo JText::_('K2_TIMES'); ?>
						</span>
						<?php endif; ?>
			
						<?php if($this->item->params->get('itemDateModified') && intval($this->item->modified)!=0): ?>
						<!-- Item date modified -->
						<span class="itemDateModified">
							<?php echo JText::_('K2_LAST_MODIFIED_ON'); ?> <?php echo JHTML::_('date', $this->item->modified, JText::_('K2_DATE_FORMAT_LC2')); ?>
						</span>
						<?php endif; ?>
					</dd>
				<?php endif; ?>
				
      </dl>
      <?php if(JRequest::getInt('print')!=1): ?>
      
			<?php endif; ?>
    </aside>
		<?php endif; ?>
		
		
		 
	  </div>
	
	  <!-- Plugins: AfterDisplayTitle -->
	  <?php echo $this->item->event->AfterDisplayTitle; ?>
	
	  <!-- K2 Plugins: K2AfterDisplayTitle -->
	  <?php echo $this->item->event->K2AfterDisplayTitle; ?>
	
		<?php if(
			$this->item->params->get('itemFontResizer') ||
			$this->item->params->get('itemVideoAnchor') ||
			$this->item->params->get('itemImageGalleryAnchor')
		): ?>
	  <div class="itemToolbar">
			<ul>
				<?php if($this->item->params->get('itemFontResizer')): ?>
				<!-- Font Resizer -->
				<li>
					<span class="itemTextResizerTitle"><?php echo JText::_('K2_FONT_SIZE'); ?></span>
					<a href="#" id="fontDecrease">
						<span><?php echo JText::_('K2_DECREASE_FONT_SIZE'); ?></span>
						<img src="<?php echo JURI::root(true); ?>/components/com_k2/images/system/blank.gif" alt="<?php echo JText::_('K2_DECREASE_FONT_SIZE'); ?>" />
					</a>
					<a href="#" id="fontIncrease">
						<span><?php echo JText::_('K2_INCREASE_FONT_SIZE'); ?></span>
						<img src="<?php echo JURI::root(true); ?>/components/com_k2/images/system/blank.gif" alt="<?php echo JText::_('K2_INCREASE_FONT_SIZE'); ?>" />
					</a>
				</li>
				<?php endif; ?>
	
				<?php if($this->item->params->get('itemSocialButton') && !is_null($this->item->params->get('socialButtonCode', NULL))): ?>
				<!-- Item Social Button -->
				<li>
					<?php echo $this->item->params->get('socialButtonCode'); ?>
				</li>
				<?php endif; ?>
	
				<?php if($this->item->params->get('itemVideoAnchor') && !empty($this->item->video)): ?>
				<!-- Anchor link to item video below - if it exists -->
				<li>
					<a class="itemVideoLink k2Anchor" href="<?php echo $this->item->link; ?>#itemVideoAnchor"><?php echo JText::_('K2_MEDIA'); ?></a>
				</li>
				<?php endif; ?>
	
				<?php if($this->item->params->get('itemImageGalleryAnchor') && !empty($this->item->gallery)): ?>
				<!-- Anchor link to item image gallery below - if it exists -->
				<li>
					<a class="itemImageGalleryLink k2Anchor" href="<?php echo $this->item->link; ?>#itemImageGalleryAnchor"><?php echo JText::_('K2_IMAGE_GALLERY'); ?></a>
				</li>
				<?php endif; ?>
			</ul>
			<div class="clr"></div>
	  </div>
		<?php endif; ?>
	
	  <div class="itemBody">
	
		  <!-- Plugins: BeforeDisplayContent -->
		  <?php echo $this->item->event->BeforeDisplayContent; ?>
	
		  <!-- K2 Plugins: K2BeforeDisplayContent -->
		  <?php echo $this->item->event->K2BeforeDisplayContent; ?>
	
		  <?php if(!empty($this->item->fulltext)): ?>
		  <?php if($this->item->params->get('itemIntroText')): ?>
		  <!-- Item introtext -->
		  <div class="itemIntroText">
		  	<?php echo $this->item->introtext; ?>
		  </div>
		  <?php endif; ?>
		  <?php if($this->item->params->get('itemFullText')): ?>
		  <!-- Item fulltext -->
		  <div class="itemFullText">
		  	<?php echo $this->item->fulltext; ?>
		  </div>
		  <?php endif; ?>
		  <?php else: ?>
		  <!-- Item text -->
		  <div class="itemFullText">
		  	<?php echo $this->item->introtext; ?>
		  </div>
		  <?php endif; ?>
	
			<div class="clr"></div>
	
		  <?php if($this->item->params->get('itemExtraFields') && count($this->item->extra_fields)): ?>
		  <!-- Item extra fields -->
		  <div class="itemExtraFields">
		  	<h3><?php echo JText::_('K2_ADDITIONAL_INFO'); ?></h3>
		  	<ul>
				<?php foreach ($this->item->extra_fields as $key=>$extraField): ?>
				<?php if($extraField->value != ''): ?>
				<li class="<?php echo ($key%2) ? "odd" : "even"; ?> type<?php echo ucfirst($extraField->type); ?> group<?php echo $extraField->group; ?>">
					<?php if($extraField->type == 'header'): ?>
					<h4 class="itemExtraFieldsHeader"><?php echo $extraField->name; ?></h4>
					<?php else: ?>
					<span class="itemExtraFieldsLabel"><?php echo $extraField->name; ?>:</span>
					<span class="itemExtraFieldsValue"><?php echo $extraField->value; ?></span>
					<?php endif; ?>
				</li>
				<?php endif; ?>
				<?php endforeach; ?>
				</ul>
		    <div class="clr"></div>
		  </div>
		  <?php endif; ?>
	
			
	
		  <!-- Plugins: AfterDisplayContent -->
		  <?php echo $this->item->event->AfterDisplayContent; ?>
	
		  <!-- K2 Plugins: K2AfterDisplayContent -->
		  <?php echo $this->item->event->K2AfterDisplayContent; ?>
	
		  <div class="clr"></div>
	  </div>
	  
	  <div class="share_item" data-uk-dropdown>

  			   <span>Did You Like This Post? Share it</span>
  			    <!-- This is the dropdown -->
  			    
  	    	    	<ul class="social-icons">
  	    	    		<li class="facebook_share">
  	    		    		<a class="prettySocial" href="#" data-type="facebook" data-title="<?php echo $this->item->title; ?>" data-description="<?php echo strip_tags($this->item->introtext); ?>" data-url="<?php echo 'http://'.$_SERVER['HTTP_HOST'].$this->item->link; ?>" data-media="<?php echo 'http://'.$_SERVER['HTTP_HOST'].$this->item->image; ?>">
  	    		    			<i class="fa fa-facebook"></i>
  	    		    		</a>
  	    		    	</li>
  	    		    	<li class="twitter_share">
  	    		    		<a class="prettySocial" href="#" data-type="twitter" data-title="<?php echo $this->item->title; ?>" data-description="<?php echo strip_tags($this->item->introtext); ?>" data-url="<?php echo 'http://'.$_SERVER['HTTP_HOST'].$this->item->link; ?>" data-media="<?php echo 'http://'.$_SERVER['HTTP_HOST'].$this->item->image; ?>">
  		    		    		<i class="fa fa-twitter"></i>
  		    		    	</a>
  	    		    	</li>
  	    		    	<li class="google_share">
  	    		    		<a class="prettySocial" href="#" data-type="googleplus" data-title="<?php echo $this->item->title; ?>" data-description="<?php echo strip_tags($this->item->introtext); ?>" data-url="<?php echo 'http://'.$_SERVER['HTTP_HOST'].$this->item->link; ?>" data-media="<?php echo 'http://'.$_SERVER['HTTP_HOST'].$this->item->image; ?>">
  	    		    			<i class="fa fa-google-plus"></i>
  	    		    		</a>
  	    		    	</li>
  	    		    	
  	    		    	<li class="pinterest">
  	    		    		<a class="prettySocial" href="#" data-type="pinterest" data-title="<?php echo $this->item->title; ?>" data-description="<?php echo strip_tags($this->item->introtext); ?>" data-url="<?php echo 'http://'.$_SERVER['HTTP_HOST'].$this->item->link; ?>" data-media="<?php echo 'http://'.$_SERVER['HTTP_HOST'].$this->item->image; ?>">
  	    		    			<i class="fa fa-pinterest"></i>
  	    		    		</a>
  	    		    	</li>
				</ul>
  		    </div>
	  
		
  </div>
	
  <?php if($this->item->params->get('itemTags') || $this->item->params->get('itemAttachments')): ?>
  <div class="itemLinks">

	  <?php if($this->item->params->get('itemTags') && count($this->item->tags)): ?>
	  <!-- Item tags -->
	  <div class="itemTagsBlock">
		  <span><i class="icon-tags"></i></span>
		  <ul class="itemTags">
		    <?php foreach ($this->item->tags as $tag): ?>
		    <li><a href="<?php echo $tag->link; ?>"><?php echo $tag->name; ?></a></li>
		    <?php endforeach; ?>
		  </ul>
		  <div class="clr"></div>
	  </div>
	  <?php endif; ?>

	  <?php if($this->item->params->get('itemAttachments') && count($this->item->attachments)): ?>
	  <!-- Item attachments -->
	  <div class="itemAttachmentsBlock">
		  <span><?php echo JText::_('K2_DOWNLOAD_ATTACHMENTS'); ?></span>
		  <ul class="itemAttachments">
		    <?php foreach ($this->item->attachments as $attachment): ?>
		    <li>
			    <a title="<?php echo K2HelperUtilities::cleanHtml($attachment->titleAttribute); ?>" href="<?php echo $attachment->link; ?>"><?php echo $attachment->title; ?></a>
			    <?php if($this->item->params->get('itemAttachmentsCounter')): ?>
			    <span>(<?php echo $attachment->hits; ?> <?php echo ($attachment->hits==1) ? JText::_('K2_DOWNLOAD') : JText::_('K2_DOWNLOADS'); ?>)</span>
			    <?php endif; ?>
		    </li>
		    <?php endforeach; ?>
		  </ul>
	  </div>
	  <?php endif; ?>

		<div class="clr"></div>
  </div>
  <?php endif; ?>

  <?php if($this->item->params->get('itemAuthorBlock') && empty($this->item->created_by_alias)): ?>
  <!-- Author Block -->
  <div class="section-title">
		<h3 class="module-title"><span>About Post Author</span></h3>
  </div>
  <div class="itemAuthorBlock">
	
	
	
  	<?php if($this->item->params->get('itemAuthorImage') && !empty($this->item->author->avatar)): ?>
  	<img class="itemAuthorAvatar" src="<?php echo $this->item->author->avatar; ?>" alt="<?php echo K2HelperUtilities::cleanHtml($this->item->author->name); ?>" />
  	
  	<?php endif; ?>

    <div class="itemAuthorDetails">
      <h3 class="itemAuthorName">
      	<a rel="author" href="<?php echo $this->item->author->link; ?>"><?php echo $this->item->author->name; ?></a>
      </h3>

      <?php if($this->item->params->get('itemAuthorDescription') && !empty($this->item->author->profile->description)): ?>
      <?php echo $this->item->author->profile->description; ?>
      <?php endif; ?>

      <?php if($this->item->params->get('itemAuthorURL') && !empty($this->item->author->profile->url)): ?>
      <span class="itemAuthorUrl"><?php //echo JText::_('K2_WEBSITE'); ?><i class="fa fa-globe"></i> <a rel="me" href="<?php echo $this->item->author->profile->url; ?>" target="_blank"><?php echo str_replace('http://','',$this->item->author->profile->url); ?></a></span>
      <?php endif; ?>

      <?php if($this->item->params->get('itemAuthorEmail')): ?>
      <span class="itemAuthorEmail"><?php echo JText::_('K2_EMAIL'); ?> <?php echo JHTML::_('Email.cloak', $this->item->author->email); ?></span>
      <?php endif; ?>

	  <!-- K2 Plugins: K2UserDisplay -->
	  <?php echo $this->item->event->K2UserDisplay; ?>

    </div>
    <div class="clr"></div>
  </div>
  <?php endif; ?>
  
  
	<div class="row-removed">
  <?php if($this->item->params->get('itemAuthorLatest') && empty($this->item->created_by_alias) && isset($this->authorLatestItems)): ?>
  <!-- Latest items from author -->
	<div class="itemAuthorLatest">
		<div class="section-title">
			<h3 class="module-title"><span><?php echo JText::_('K2_LATEST_FROM'); ?> <?php echo $this->item->author->name; ?></span></h3>
		
		</div>
		<ul>
			<?php foreach($this->authorLatestItems as $key=>$item): ?>
			<li class="<?php echo ($key%2) ? "odd" : "even"; ?>">
				<a href="<?php echo $item->link ?>"><?php echo $item->title; ?></a>
			</li>
			<?php endforeach; ?>
		</ul>
		<div class="clr"></div>
	</div>
	<?php endif; ?>

	<?php
	/*
	Note regarding 'Related Items'!
	If you add:
	- the CSS rule 'overflow-x:scroll;' in the element div.itemRelated {…} in the k2.css
	- the class 'k2Scroller' to the ul element below
	- the classes 'k2ScrollerElement' and 'k2EqualHeights' to the li element inside the foreach loop below
	- the style attribute 'style="width:<?php echo $item->imageWidth; ?>px;"' to the li element inside the foreach loop below
	...then your Related Items will be transformed into a vertical-scrolling block, inside which, all items have the same height (equal column heights). This can be very useful if you want to show your related articles or products with title/author/category/image etc., which would take a significant amount of space in the classic list-style display.
	*/
	?>

  <?php if($this->item->params->get('itemRelated') && isset($this->relatedItems)): ?>
  <!-- Related items by tag -->
	<div class="itemRelated">
		<div class="section-title">
			<h3 class="module-title"><span><?php echo JText::_("K2_RELATED_ITEMS_BY_TAG"); ?></h3></span>
		</div>
		<ul>
			<?php foreach($this->relatedItems as $key=>$item): ?>
			<li class="<?php echo ($key%2) ? "odd" : "even"; ?>">

				<?php if($this->item->params->get('itemRelatedTitle', 1)): ?>
				<a class="itemRelTitle" href="<?php echo $item->link ?>"><?php echo $item->title; ?></a>
				<?php endif; ?>

				<?php if($this->item->params->get('itemRelatedCategory')): ?>
				<div class="itemRelCat"><?php echo JText::_("K2_IN"); ?> <a href="<?php echo $item->category->link ?>"><?php echo $item->category->name; ?></a></div>
				<?php endif; ?>

				<?php if($this->item->params->get('itemRelatedAuthor')): ?>
				<div class="itemRelAuthor"><?php echo JText::_("K2_BY"); ?> <a rel="author" href="<?php echo $item->author->link; ?>"><?php echo $item->author->name; ?></a></div>
				<?php endif; ?>

				<?php if($this->item->params->get('itemRelatedImageSize')): ?>
				<img style="width:<?php echo $item->imageWidth; ?>px;height:auto;" class="itemRelImg" src="<?php echo $item->image; ?>" alt="<?php K2HelperUtilities::cleanHtml($item->title); ?>" />
				<?php endif; ?>

				<?php if($this->item->params->get('itemRelatedIntrotext')): ?>
				<div class="itemRelIntrotext"><?php echo $item->introtext; ?></div>
				<?php endif; ?>

				<?php if($this->item->params->get('itemRelatedFulltext')): ?>
				<div class="itemRelFulltext"><?php echo $item->fulltext; ?></div>
				<?php endif; ?>

				<?php if($this->item->params->get('itemRelatedMedia')): ?>
				<?php if($item->videoType=='embedded'): ?>
				<div class="itemRelMediaEmbedded"><?php echo $item->video; ?></div>
				<?php else: ?>
				<div class="itemRelMedia"><?php echo $item->video; ?></div>
				<?php endif; ?>
				<?php endif; ?>

				<?php if($this->item->params->get('itemRelatedImageGallery')): ?>
				<div class="itemRelImageGallery"><?php echo $item->gallery; ?></div>
				<?php endif; ?>
			</li>
			<?php endforeach; ?>
			<li class="clr"></li>
		</ul>
		<div class="clr"></div>
	</div>
	<?php endif; ?>
	</div>

	<div class="clr"></div>

  

  <?php if($this->item->params->get('itemImageGallery') && !empty($this->item->gallery)): ?>
  <!-- Item image gallery -->
  <a name="itemImageGalleryAnchor" id="itemImageGalleryAnchor"></a>
  <div class="itemImageGallery">
	  <h3><?php echo JText::_('K2_IMAGE_GALLERY'); ?></h3>
	  <?php echo $this->item->gallery; ?>
  </div>
  <?php endif; ?>

  <?php if($this->item->params->get('itemNavigation') && !JRequest::getCmd('print') && (isset($this->item->nextLink) || isset($this->item->previousLink))): ?>
  <!-- Item navigation -->
  <div class="itemNavigation">
		<?php if(isset($this->item->previousLink)): ?>
		<a class="itemPrevious" href="<?php echo $this->item->previousLink; ?>">
			&laquo; <?php echo $this->item->previousTitle; ?>
		</a>
		<?php endif; ?>

		<?php if(isset($this->item->nextLink)): ?>
		<a class="itemNext" href="<?php echo $this->item->nextLink; ?>">
			<?php echo $this->item->nextTitle; ?> &raquo;
		</a>
		<?php endif; ?>

  </div>
  <?php endif; ?>

  <!-- Plugins: AfterDisplay -->
  <?php echo $this->item->event->AfterDisplay; ?>

  <!-- K2 Plugins: K2AfterDisplay -->
  <?php echo $this->item->event->K2AfterDisplay; ?>

  <?php if($this->item->params->get('itemComments') && ( ($this->item->params->get('comments') == '2' && !$this->user->guest) || ($this->item->params->get('comments') == '1'))): ?>
  <!-- K2 Plugins: K2CommentsBlock -->
  <?php echo $this->item->event->K2CommentsBlock; ?>
  <?php endif; ?>

 <?php if($this->item->params->get('itemComments') && ($this->item->params->get('comments') == '1' || ($this->item->params->get('comments') == '2')) && empty($this->item->event->K2CommentsBlock)): ?>
  <!-- Item comments -->
  <a name="itemCommentsAnchor" id="itemCommentsAnchor"></a>

  <div class="itemComments">

	  <?php if($this->item->params->get('commentsFormPosition')=='above' && $this->item->params->get('itemComments') && !JRequest::getInt('print') && ($this->item->params->get('comments') == '1' || ($this->item->params->get('comments') == '2' && K2HelperPermissions::canAddComment($this->item->catid)))): ?>
	  <!-- Item comments form -->
	  <div class="itemCommentsForm">
	  	<?php echo $this->loadTemplate('comments_form'); ?>
	  </div>
	  <?php endif; ?>

	  <?php if($this->item->numOfComments>0 && $this->item->params->get('itemComments') && ($this->item->params->get('comments') == '1' || ($this->item->params->get('comments') == '2'))): ?>
	  <!-- Item user comments -->
	  
	  <h3 class="itemCommentsCounter">
	  	<span><?php echo $this->item->numOfComments; ?></span> <?php echo ($this->item->numOfComments>1) ? JText::_('K2_COMMENTS') : JText::_('K2_COMMENT'); ?>
	  </h3>

	  <ul class="itemCommentsList">
	    <?php foreach ($this->item->comments as $key=>$comment): ?>
	    <li class="<?php echo ($key%2) ? "odd" : "even"; echo (!$this->item->created_by_alias && $comment->userID==$this->item->created_by) ? " authorResponse" : ""; echo($comment->published) ? '':' unpublishedComment'; ?>">

	    	<span class="commentLink">
		    	<a href="<?php echo $this->item->link; ?>#comment<?php echo $comment->id; ?>" name="comment<?php echo $comment->id; ?>" id="comment<?php echo $comment->id; ?>">
		    		<?php echo JText::_('K2_COMMENT_LINK'); ?>
		    	</a>
		    </span>

				<?php if($comment->userImage): ?>
				<img src="<?php echo $comment->userImage; ?>" alt="<?php echo JFilterOutput::cleanText($comment->userName); ?>" width="<?php echo $this->item->params->get('commenterImgWidth'); ?>" />
				<?php endif; ?>

				<span class="commentDate">
		    	<?php echo JHTML::_('date', $comment->commentDate, JText::_('K2_DATE_FORMAT_LC2')); ?>
		    </span>

		    <span class="commentAuthorName">
			    <?php echo JText::_('K2_POSTED_BY'); ?>
			    <?php if(!empty($comment->userLink)): ?>
			    <a href="<?php echo JFilterOutput::cleanText($comment->userLink); ?>" title="<?php echo JFilterOutput::cleanText($comment->userName); ?>" target="_blank" rel="nofollow">
			    	<?php echo $comment->userName; ?>
			    </a>
			    <?php else: ?>
			    <?php echo $comment->userName; ?>
			    <?php endif; ?>
		    </span>

		    <p><?php echo $comment->commentText; ?></p>

				<?php if($this->inlineCommentsModeration || ($comment->published && ($this->params->get('commentsReporting')=='1' || ($this->params->get('commentsReporting')=='2' && !$this->user->guest)))): ?>
				<span class="commentToolbar">
					<?php if($this->inlineCommentsModeration): ?>
					<?php if(!$comment->published): ?>
					<a class="commentApproveLink" href="<?php echo JRoute::_('index.php?option=com_k2&view=comments&task=publish&commentID='.$comment->id.'&format=raw')?>"><?php echo JText::_('K2_APPROVE')?></a>
					<?php endif; ?>

					<a class="commentRemoveLink" href="<?php echo JRoute::_('index.php?option=com_k2&view=comments&task=remove&commentID='.$comment->id.'&format=raw')?>"><?php echo JText::_('K2_REMOVE')?></a>
					<?php endif; ?>

					<?php if($comment->published && ($this->params->get('commentsReporting')=='1' || ($this->params->get('commentsReporting')=='2' && !$this->user->guest))): ?>
					<a class="modal" rel="{handler:'iframe',size:{x:560,y:480}}" href="<?php echo JRoute::_('index.php?option=com_k2&view=comments&task=report&commentID='.$comment->id)?>"><?php echo JText::_('K2_REPORT')?></a>
					<?php endif; ?>

					<?php if($comment->reportUserLink): ?>
					<a class="k2ReportUserButton" href="<?php echo $comment->reportUserLink; ?>"><?php echo JText::_('K2_FLAG_AS_SPAMMER'); ?></a>
					<?php endif; ?>

				</span>
				<?php endif; ?>

				<div class="clr"></div>
	    </li>
	    <?php endforeach; ?>
	  </ul>

	  <div class="itemCommentsPagination">
	  	<?php echo $this->pagination->getPagesLinks(); ?>
	  	<div class="clr"></div>
	  </div>
		<?php endif; ?>

		<?php if($this->item->params->get('commentsFormPosition')=='below' && $this->item->params->get('itemComments') && !JRequest::getInt('print') && ($this->item->params->get('comments') == '1' || ($this->item->params->get('comments') == '2' && K2HelperPermissions::canAddComment($this->item->catid)))): ?>
	  <!-- Item comments form -->
	  <div class="itemCommentsForm">
	  	<?php echo $this->loadTemplate('comments_form'); ?>
	  </div>
	  <?php endif; ?>

	  <?php $user = JFactory::getUser(); if ($this->item->params->get('comments') == '2' && $user->guest): ?>
	  		<div><?php echo JText::_('K2_LOGIN_TO_POST_COMMENTS'); ?></div>
	  <?php endif; ?>

  </div>
  <?php endif; ?>


	<div class="clr"></div>
</div>
<!-- End K2 Item Layout -->
	</div>

</div>


