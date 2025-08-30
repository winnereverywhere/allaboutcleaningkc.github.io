(function($){$(document).ready(function(){if($('#wpcb-lightbox-container').length===0){$('body').append(`
                <div id="wpcb-lightbox-container" style="display:none;">
                    <div class="wpcb-lightbox-overlay"></div>
                    <div class="wpcb-lightbox-content">
                        <div class="wpcb-lightbox-close">&times;</div>
                        <div class="wpcb-lightbox-video-wrapper">
                            <div class="wpcb-lightbox-video-container"></div>
                        </div>
                    </div>
                </div>
            `);$('<style>').text(`
                    #wpcb-lightbox-container {
                        position: fixed;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        z-index: 999999;
                    }
                    .wpcb-lightbox-overlay {
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        background-color: rgba(0, 0, 0, 0.8);
                    }
                    .wpcb-lightbox-content {
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                        background-color: #000;
                        border-radius: 5px;
                        width: 90%;
                        max-width: 900px; /* Maximum width of the lightbox */
                    }
                    .wpcb-lightbox-close {
                        position: absolute;
                        top: -20px;
                        right: -20px;
                        color: white;
                        font-size: 24px;
                        cursor: pointer;
                        background: #122031;
                        width: 30px;
                        height: 30px;
                        border-radius: 50%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        z-index: 1;
                    }
                    /* Responsive video wrapper with 16:9 aspect ratio */
                    .wpcb-lightbox-video-wrapper {
                        position: relative;
                        width: 100%;
                        padding-bottom: 56.25%; /* 16:9 aspect ratio (9/16 = 0.5625) */
                        height: 0;
                        overflow: hidden;
                    }
                    .wpcb-lightbox-video-container {
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                    }
                    .wpcb-lightbox-video-container iframe {
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        border: 0;
                    }
                `).appendTo('head');}
$('.wpcb-text-link[data-type="lightbox"]').on('click',function(e){e.preventDefault();let videoUrl=$(this).attr('href');if(videoUrl.includes('youtube.com')||videoUrl.includes('youtu.be')){if(videoUrl.includes('?')){if(!videoUrl.includes('autoplay=1')){videoUrl+='&autoplay=1';}}else{videoUrl+='?autoplay=1';}
videoUrl+='&rel=0&showinfo=0';}
const iframe=$('<iframe>').attr('src',videoUrl).attr('frameborder','0').attr('allowfullscreen','true').attr('allow','accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');$('.wpcb-lightbox-video-container').empty().append(iframe);$('#wpcb-lightbox-container').fadeIn();});$(document).on('click','.wpcb-lightbox-close, .wpcb-lightbox-overlay',function(){$('.wpcb-lightbox-video-container').empty();$('#wpcb-lightbox-container').fadeOut();});$(document).keyup(function(e){if(e.key==="Escape"&&$('#wpcb-lightbox-container').is(':visible')){$('.wpcb-lightbox-video-container').empty();$('#wpcb-lightbox-container').fadeOut();}});$(document).on('click','.wpcb-ad-close',function(e){e.preventDefault();const adContainer=$(this).closest('.wpcb-ad-container');const adId=adContainer.data('ad-id');adContainer.fadeOut(300,function(){$(this).remove();});$.ajax({url:ajaxurl,type:'POST',data:{action:'wpai_dismiss_ad',ad_id:adId,nonce:wpaiAdsDismiss.nonce},success:function(response){if(response.success){}}});});});})(jQuery);