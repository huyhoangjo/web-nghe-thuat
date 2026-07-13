const SEED_DATA = {
  works: [
    {
      id: "work_1",
      titleEn: "None color clouds",
      titleVi: "Những áng mây không màu",
      chapter: 1,
      materialEn: "Mixed media on paper",
      materialVi: "Chất liệu tổng hợp trên giấy",
      dimensions: "50 x 65 cm",
      year: 2014,
      image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgd8kaPKFGGcy2u4jaAmLGlVpY4ijyNU_ogtsl_jtEdO7z4gXjntU2PKrR5-U4fCHMfMAueBIObBRbb_2fMisQowlO38nV97xkZ6Y9LjfX32ihyAXPT94Ai2bWBJwpiqsZT6y_p2ki4dEQm/s1600/drawing+-Is1.jpg",
      descriptionEn: "Exploring formless entities and internal memories, drawing empty color clouds drifting in space.",
      descriptionVi: "Khảo sát thực thể vô hình và ký ức bên trong, vẽ những áng mây không sắc màu trôi nổi trong không gian.",
      status: "exhibited",
      relatedJournalIds: [],
      relatedNoteIds: []
    },
    {
      id: "work_2",
      titleEn: "Cocoon",
      titleVi: "Kén",
      chapter: 2,
      materialEn: "Mixed media on paper",
      materialVi: "Chất liệu tổng hợp trên giấy",
      dimensions: "50 x 65 cm",
      year: 2013,
      image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjP_oiOEtzZBDR-fStq0hvWF3etg0kmrEl4HABc54K6yUQJc2mSp80mkRNjbF10f0MhUKAhNOnI1vpfbERhuWwHb9OsL7xpaZOovJfmxzwqKlb25R_eAnMa3UcjnssPYbRdHLqw4rw6_y71/s1600/IMAG7249_3.jpg",
      descriptionEn: "Representing protective layers, isolation, and emotional incubation before transformation.",
      descriptionVi: "Biểu trưng cho những lớp bảo vệ, sự cô lập và quá trình ấp ủ cảm xúc trước khi chuyển hóa.",
      status: "exhibited",
      relatedJournalIds: ["journal_1"],
      relatedNoteIds: []
    },
    {
      id: "work_3",
      titleEn: "There is sky",
      titleVi: "Ở đó là bầu trời",
      chapter: 4,
      materialEn: "Mixed media on paper",
      materialVi: "Chất liệu tổng hợp trên giấy",
      dimensions: "50 x 65 cm",
      year: 2013,
      image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEikgRMPMFM6RXiIPM1HMVRRwvpzmq8X_-oTmqKJ2MNEuhrFhsBnJI8bACTN-qG7s2sYn3rhHKlGPaHafvMs77RWMmwt-BeuJ0MtKxEGSWn8vkzKtWK2R2SrOsCUCM_M3WMFekn71e-MvGQp/s1600/small.jpg",
      descriptionEn: "A drawing tracing the vastness of the mind, searching for an open sky within constraints.",
      descriptionVi: "Bản vẽ phác thảo sự rộng lớn của tâm trí, tìm kiếm một bầu trời rộng mở trong những giới hạn.",
      status: "available",
      relatedJournalIds: [],
      relatedNoteIds: []
    },
    {
      id: "work_4",
      titleEn: "Crossing the line",
      titleVi: "Vượt qua lằn ranh",
      chapter: 3,
      materialEn: "Bilingual conceptual installation & virtual home",
      materialVi: "Sắp đặt ý niệm song ngữ & ngôi nhà ảo",
      dimensions: "Dimensions variable",
      year: 2012,
      image: "https://lh3.googleusercontent.com/blogger_img_proxy/AEn0k_snCscbKrMCl2MOtwcWho1b9hwoir1hUb7vVc5L2_zPQMe_fGMdA5nXHbj8yJkFTlGfR2v-rsOT8HTBMpGMyJK_hq3iM7vDpIBIN6TO74zq8ufruQUZG6ANo5EqE--RteWzMXDmO8XTBgFDePHjvSOP0IE3E0aSCT59uZkLoyFlkc84=s0-d",
      descriptionEn: "An artist residency collaboration with architect Lin Hsin Her at Howlspace (Tainan). It reflects the political, social, and historical conditions of Vietnamese brides in Taiwan, building a virtual 'home' to receive their memories.",
      descriptionVi: "Dự án cộng tác lưu trú nghệ thuật với kiến trúc sư Lin Hsin Her tại Howlspace (Đài Nam). Tác phẩm phản ánh bối cảnh chính trị, xã hội và lịch sử của những người vợ Việt Nam nhập cư tại Đài Loan, xây dựng một 'ngôi nhà' ảo để chứa đựng ký ức của họ.",
      status: "exhibited",
      relatedJournalIds: [],
      relatedNoteIds: ["note_2"]
    }
  ],
  journal: [
    {
      id: "journal_1",
      titleEn: "Before the rain",
      titleVi: "Trước khi trời đổ mưa",
      contentEn: "Tonight, the moon is full again. She does not remember how many times the full moon had passed since she left Cu Chi. Light and bustle of Istanbul city did not eclipse the moonlight. Day by day life is getting more difficult, enclosed with the worries of everyday prices, petrol, school fees. But everything can disappear, yet the memory of place and brothers working together remains.",
      contentVi: "Đêm nay, trăng lại tròn, không biết đã tròn đến lần thứ mấy từ khi cô xa nơi Củ Chi bình yên ấy. Ánh sáng và sự ồn ào náo nhiệt của thành phố Istanbul không làm lu mờ ánh trăng. Cuộc sống hằng ngày trôi qua với những nỗi lo cơm áo gạo tiền, giá cả, xăng xe. Nhưng mọi thứ có thể biến mất, chỉ có nơi chốn và ký ức về những người anh em làm việc cùng nhau là còn lại.",
      date: "2013-08-14",
      locationEn: "Istanbul",
      locationVi: "Istanbul",
      image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjP_oiOEtzZBDR-fStq0hvWF3etg0kmrEl4HABc54K6yUQJc2mSp80mkRNjbF10f0MhUKAhNOnI1vpfbERhuWwHb9OsL7xpaZOovJfmxzwqKlb25R_eAnMa3UcjnssPYbRdHLqw4rw6_y71/s1600/IMAG7249_3.jpg"
    }
  ],
  fieldNotes: [
    {
      id: "note_2",
      category: "travel",
      titleEn: "Encountering Vietnamese Brides in Beitou",
      titleVi: "Gặp gỡ những cô dâu Việt tại Bắc Đầu",
      contentEn: "At a small eatery in the traditional market of Beitou, Taipei. First time meeting Vietnamese women married to Taiwanese men. They build strong communities, supporting each other and sending aid back home. A resilience hidden behind everyday smiles.",
      contentVi: "Tại một quán ăn nhỏ trong chợ truyền thống ở quận Bắc Đầu, Đài Bắc. Lần đầu tiên gặp gỡ những người phụ nữ Việt lấy chồng Đài Loan. Họ xây dựng cộng đồng vững chắc, đùm bọc lẫn nhau và gửi tiền về giúp đỡ gia đình. Một sự kiên cường ẩn sau những nụ cười bình dị.",
      date: "2012-09-10",
      locationEn: "Beitou, Taipei",
      locationVi: "Bắc Đầu, Đài Bắc",
      countryEn: "Taiwan",
      countryVi: "Đài Loan"
    }
  ],
  publications: [
    {
      id: "pub_1",
      titleEn: "Crossing the Line: Collaborative Speculations",
      titleVi: "Vượt Qua Lằn Ranh: Những Suy Tưởng Cộng Tác",
      descriptionEn: "Art Plus Magazine Issue Oct 2012 review by Lin Chen-Wei.",
      descriptionVi: "Bài viết phê bình trên Tạp chí Art Plus số tháng 10 năm 2012 bởi Lâm Thần Vĩ.",
      pdfUrl: "#",
      coverImage: "https://lh3.googleusercontent.com/blogger_img_proxy/AEn0k_tgVWT8cGOlPIgEZ9SEbpxtHgh2FefyjX8ED1blcn5iKXVZ8PU4Yv_yB4-28FW71qcbjBQJDLnTKOI1AUdiuQp8jqB_J3Vyb7Fy6IHkjO8ANXpbgBLxEmVjgUMufAJiixmg9diWi3qmBaU-5YBJj_fhyNC3Sq_Vsu6i=s0-d"
    }
  ],
  archive: [
    {
      id: "arc_1",
      category: "sketches",
      titleEn: "Untitled Drawing 01",
      titleVi: "Vô đề 01",
      image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh0dV20ebS7XZI4zZ1akUA8b-4cdJauBV7VrITgQyywgeUWCLTobqcQqiJrejAhDaAUvRrSfjRNip_z0r6f6rhyphenhyphenhl6rHvdZPqK3HxVKv1rsdIKC6SaaPWP-3Hs-ZW8RYlhpPRTaHeqgKQKn/s1600/IMAG0315-1.jpg",
      date: "2013",
      descriptionEn: "Charcoal and graphite study on paper, 25 x 35 cm.",
      descriptionVi: "Nghiên cứu than chì và graphite trên giấy, 25 x 35 cm."
    },
    {
      id: "arc_2",
      category: "sketches",
      titleEn: "Untitled Drawing 02",
      titleVi: "Vô đề 02",
      image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEi8YdbqS013rrZ0uoDueO0xpq0To1TZ5xeMrqolHjJa8A6UtkMyyLyQCvT4DAsZKDu0r2xDxv9NUeBs8UZTlfWQm04ASlf2H6PewrRPIAGjL8MawHiyOJgZDVUBgmAhE0UBI51Zi-0BCv0k/s1600/IMAG0322-1.jpg",
      date: "2013",
      descriptionEn: "Charcoal and graphite study on paper, 25 x 35 cm.",
      descriptionVi: "Nghiên cứu than chì và graphite trên giấy, 25 x 35 cm."
    }
  ],
  cv: [
    {
      id: "cv_1",
      category: "solo",
      year: 2011,
      titleEn: "Performance 'Allergy'",
      titleVi: "Trình diễn 'Dị ứng'",
      locationEn: "Zero Station, Ho Chi Minh City, Vietnam",
      locationVi: "Ga Số 0, TP. Hồ Chí Minh, Việt Nam"
    },
    {
      id: "cv_2",
      category: "solo",
      year: 2007,
      titleEn: "Painting Exhibition 'Departure'",
      titleVi: "Triển lãm Tranh 'Ra Đi'",
      locationEn: "Tu Do Art Gallery, Ho Chi Minh City, Vietnam",
      locationVi: "Phòng tranh Tự Do, TP. Hồ Chí Minh, Việt Nam"
    },
    {
      id: "cv_3",
      category: "group",
      year: 2013,
      titleEn: "Path to nowhere",
      titleVi: "Đường đến hư không",
      locationEn: "Treasure Hill Artist Village, Taipei, Taiwan",
      locationVi: "Làng nghệ sĩ Đồi Kho Báu, Đài Bắc, Đài Loan"
    },
    {
      id: "cv_4",
      category: "residency",
      year: 2012,
      titleEn: "Artist in Residence in Cu Chi",
      titleVi: "Nghệ sĩ lưu trú tại Củ Chi",
      locationEn: "FPDV Workshop, Ho Chi Minh City, Vietnam",
      locationVi: "Xưởng thực hành FPDV, TP. Hồ Chí Minh, Việt Nam"
    },
    {
      id: "cv_5",
      category: "residency",
      year: 2012,
      titleEn: "South Country, the South of Country Exchange Project",
      titleVi: "Dự án trao đổi Đất nước phía Nam, phía Nam Đất nước",
      locationEn: "Howlspace, Tainan, Taiwan",
      locationVi: "Howlspace, Đài Nam, Đài Loan"
    }
  ]
};

export function getDatabase() {
  const data = localStorage.getItem("artistic_archive_db_v2");
  if (!data) {
    localStorage.setItem("artistic_archive_db_v2", JSON.stringify(SEED_DATA));
    return SEED_DATA;
  }
  return JSON.parse(data);
}

export function saveDatabase(db) {
  localStorage.setItem("artistic_archive_db_v2", JSON.stringify(db));
}

export function resetDatabaseToSeed() {
  localStorage.setItem("artistic_archive_db_v2", JSON.stringify(SEED_DATA));
  return SEED_DATA;
}

export function getSeedData() {
  return SEED_DATA;
}
