import os
import shutil
import json
import zipfile
import xml.etree.ElementTree as ET

def read_docx_text(docx_path):
    if not os.path.exists(docx_path):
        return ""
    try:
        with zipfile.ZipFile(docx_path) as z:
            xml_content = z.read('word/document.xml')
            tree = ET.fromstring(xml_content)
            texts = []
            for node in tree.iter():
                if node.tag.endswith('p'):
                    p_text = ''.join([n.text for n in node.iter() if n.text])
                    if p_text.strip():
                        texts.append(p_text.strip())
            return '\n\n'.join(texts)
    except Exception as e:
        print(f"Error reading {docx_path}: {e}")
        return ""

def clean_filename(filename):
    return "".join([c if c.isalnum() or c in ".-_" else "_" for c in filename])

def copy_image(src_path, dest_dir):
    os.makedirs(dest_dir, exist_ok=True)
    filename = clean_filename(os.path.basename(src_path))
    dest_path = os.path.join(dest_dir, filename)
    shutil.copy2(src_path, dest_path)
    return f"/images/works/{filename}"

print("=== START SYNCING THU VIEN DATA ===")

dest_images_dir = os.path.join("public", "images", "works")

# 1. Process Departure (2007) Paintings
departure_dir = os.path.join("Thu vien", "(Done)2.Body of work 02. Departure (2007)")
departure_images = []
if os.path.exists(departure_dir):
    for f in os.listdir(departure_dir):
        if f.lower().endswith(('.jpg', '.jpeg', '.png')):
            full_p = os.path.join(departure_dir, f)
            web_url = copy_image(full_p, dest_images_dir)
            departure_images.append((f, web_url))

print(f"Copied {len(departure_images)} Departure images.")

# Read posts.json
with open('lib/data/posts.json', 'r', encoding='utf-8') as f:
    posts = json.load(f)

# Update posts in posts.json with proper titles and descriptions
for post in posts:
    slug = post.get('slug', '')
    
    if slug == 'forbidden-fruit-trai-cam-2007-oil-on' or slug == 'blog-post-2007':
        post['title'] = 'Trái cấm (Forbidden Fruit)'
        post['year'] = '2007'
        post['bodyText'] = 'Trái cấm / Forbidden Fruit (2007). Sơn dầu trên vải (Oil on canvas), 80 x 60 cm. Thuộc series triển lãm cá nhân Departure tại Tự Do Gallery, TPHCM.'
        dep_imgs = [url for name, url in departure_images if 'ForbiddenFruit' in name or 'Forbidden' in name]
        if dep_imgs:
            post['images'] = dep_imgs
            
    elif slug == 'blog-post-2003':
        post['title'] = 'Núi Ngự Bình (Ngự Bình Mountain Installation)'
        post['year'] = '2003'
        post['bodyText'] = 'Tác phẩm sắp đặt Núi Ngự Bình thuộc triển lãm Bản đồ Huế (Huế Map Project) tại Đại học Nghệ thuật Huế năm 2003.'
        
    elif slug == 'khat-vong-installation-work-at-hue':
        post['title'] = 'Khát vọng bình yên (Aspiration for Peace)'
        post['year'] = '2004'
        post['bodyText'] = 'Tác phẩm Sắp đặt Khát vọng bình yên tại Huế Festival 2004.'
        
    elif slug == 'blog-post-2005':
        post['title'] = 'Hãy mở tôi ra (Please Open Me)'
        post['year'] = '2005'
        post['bodyText'] = 'Tác phẩm Sắp đặt & Trình diễn hợp tác cùng Nhóm Vô Cực (Infinity Group) tại Huế năm 2005.'
        
    elif slug == 'nang-tho-installation-work-at-hue':
        post['title'] = 'Nàng thơ (Poetry Installation)'
        post['year'] = '2006'
        post['bodyText'] = 'Tác phẩm Sắp đặt Nàng thơ tại Huế Festival 2006.'
        
    elif slug == 'leo-len-2006-rush-hours-project-at':
        post['title'] = 'Giờ cao điểm (Rush Hours Project)'
        post['year'] = '2006'
        post['bodyText'] = 'Dự án Sắp đặt Giờ cao điểm thuộc dự án Saigon Open City năm 2006.'

    elif slug == 'no-respond-2007-in-choengju-korea':
        post['title'] = 'Không phản hồi (No Respond Performance)'
        post['year'] = '2007'
        post['bodyText'] = 'Tác phẩm Trình diễn Không phản hồi (No Respond) tại Lễ hội Nghệ thuật Trình diễn Cheongju, Hàn Quốc năm 2007.'

    elif slug == 'blog-post-2009':
        post['title'] = 'Dị ứng (Allergy Performance - Seoul 2009)'
        post['year'] = '2009'
        post['bodyText'] = 'Tác phẩm Trình diễn cá nhân Dị ứng (Allergy) tại Mạng lưới Nghệ thuật Trình diễn Châu Á (PAN ASIA) ở Seoul, Hàn Quốc năm 2009.'

    elif slug == 'the-universality-of-pain-and-broken':
        post['title'] = 'Tính phổ quát của đớn đau và sự vỡ mộng (The Universality of Pain)'
        post['year'] = '2011'
        ali_text = read_docx_text(os.path.join('Thu vien', 'Performance Artworks', '2011. Solo Performance Allergy, Zero Station, HCM', '_VI_Universality of Pain and Broken Dreams.docx'))
        if ali_text:
            post['bodyText'] = ali_text

    elif slug == 'allergy-2011-at-zero-station-vietnam':
        post['title'] = 'Triển lãm Trình diễn Dị ứng (Allergy Solo Performance - Ga 0)'
        post['year'] = '2011'
        statement_text = read_docx_text(os.path.join('Thu vien', 'Body of work 03. Beyond the Body (2007–2012)', 'Allergy 2011, Zero Station, HCMC', 'Tư liệu for Allergy_', 'ngo_duyen_ Allergy_s statement. Vietnamese.docx'))
        if statement_text:
            post['bodyText'] = statement_text

    elif slug == 'crossing-line-2012-performance-work-at':
        post['title'] = 'Băng qua ranh giới (Crossing the Line)'
        post['year'] = '2012'
        post['bodyText'] = 'Dự án nghệ thuật khâu và trình diễn Băng qua ranh giới (Crossing the Line) tại Howlspace, Tài Nam, Đài Loan năm 2012.'

    elif slug == 'truoc-khi-troi-o-mua-before-rain-2012' or slug == 'truoc-khi-troi-o-mua-before-rain-2013-08':
        post['title'] = 'Trước khi trời đổ mưa (Before the Rain)'
        post['year'] = '2012'
        post['bodyText'] = 'Series tác phẩm Trước khi trời đổ mưa (Before the Rain) được sáng tác trong thời gian lưu trú tại Trại sáng tác Củ Chi năm 2012.'

    elif slug == 'artist-bio':
        post['title'] = 'TIỂU SỬ NGHỆ SĨ (ARTIST BIOGRAPHY)'
        bio_text = read_docx_text(os.path.join('Thu vien', 'PRACTICE (done content)', '04. ARTIST BIOGRAPHY- full_.docx'))
        if bio_text:
            post['bodyText'] = bio_text

# Write updated posts back to posts.json
with open('lib/data/posts.json', 'w', encoding='utf-8') as f:
    json.dump(posts, f, ensure_ascii=False, indent=2)

print("=== SYNC COMPLETED SUCCESSFULLY ===")
