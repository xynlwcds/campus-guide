// 导航栏交互
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// 页面加载时锁定滚动
window.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('lock-scroll');
});

// 汉堡菜单切换
hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// 平滑滚动
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
        
        // 移动端关闭菜单
        navMenu.classList.remove('active');
        
        // 更新活动链接
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
    });
});

// 滚动时更新导航栏活动状态
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        
        if (window.pageYOffset >= sectionTop && 
            window.pageYOffset < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// CTA按钮点击事件
const ctaButton = document.querySelector('.cta-button');
if (ctaButton) {
    ctaButton.addEventListener('click', () => {
        // 隐藏首页
        const heroSection = document.querySelector('.hero');
        if (heroSection) {
            heroSection.classList.add('hide');
        }
        
        // 显示导航栏
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            navbar.classList.add('show');
        }
        
        // 解除滚动锁定
        document.body.classList.remove('lock-scroll');
        
        // 滚动到页面顶部
        setTimeout(() => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }, 100);
    });
}

// 表单提交处理（如果页面中有表单）
const feedbackForm = document.getElementById('feedbackForm');
if (feedbackForm) {
    feedbackForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // 获取表单数据
        const name = feedbackForm.querySelector('input[type="text"]').value;
        const email = feedbackForm.querySelector('input[type="email"]').value;
        const type = feedbackForm.querySelector('select').value;
        const message = feedbackForm.querySelector('textarea').value;
        
        // 显示成功消息
        alert(`感谢您的反馈！

姓名：${name}
邮箱：${email}
类型：${getTypeText(type)}

我们会尽快处理您的反馈。`);
        
        // 重置表单
        feedbackForm.reset();
    });
}

// 获取反馈类型文本
function getTypeText(type) {
    const types = {
        'suggestion': '建议',
        'complaint': '投诉',
        'praise': '表扬',
        'other': '其他'
    };
    return types[type] || '未选择';
}

// 滚动动画效果
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// 为需要动画的元素添加观察
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll(
        '.classroom-building, .express-station, .tip-card'
    );
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// 按钮悬浮效果增强
const buttons = document.querySelectorAll('.btn-secondary, .cta-button');
buttons.forEach(button => {
    button.addEventListener('click', (e) => {
        // 创建涟漪效果
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        button.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// 页面加载动画
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// 部门弹窗功能
const deptModal = document.getElementById('deptModal');
const modalTitle = document.getElementById('modalTitle');
const modalImage = document.getElementById('modalImage');
const modalDescription = document.getElementById('modalDescription');
const modalClose = document.querySelector('.modal-close');

// 部门信息数据库
const departmentData = {
    '党务助理部': {
        image: '1.jpg',
        description: '党务助理部负责党员发展培养、党务工作管理、党员教育活动组织和入党积极分子培训等工作。我们致力于加强党的建设，培养优秀党员，发挥党员先锋模范作用。'
    },
    '组织部': {
        image: '1.jpg',
        description: '组织部主要负责团员组织管理、团费收缴、团组织建设和团员档案管理工作。我们致力于加强团组织建设，提高团员素质，促进团的事业发展。'
    },
    '宣传部新媒体工作室': {
        image: '1.jpg',
        description: '宣传部新媒体工作室负责新媒体运营、宣传推广、视频制作和公众号管理工作。我们运用现代传播手段，传递青春正能量，展现校园文化风采。'
    },
    '青发部': {
        image: '1.jpg',
        description: '青发部致力于青年发展服务、志愿服务组织、社会实践活动组织和青年成长指导。我们为广大青年搭建成长平台，助力青年全面发展。'
    },
    '社团科技部': {
        image: '1.jpg',
        description: '社团科技部负责社团管理指导、科技创新活动、学术竞赛组织和创新项目支持。我们推动科技创新，培养创新人才，营造浓厚的学术氛围。'
    },
    '文化体育部': {
        image: '1.jpg',
        description: '文化体育部负责组织文艺演出、体育竞赛、文化交流活动，丰富校园文化生活。我们致力于打造精彩纷呈的文体活动，展现学生风采。'
    },
    '心理健康部': {
        image: '1.jpg',
        description: '心理健康部提供心理咨询服务、心理健康讲座、心理活动组织，关注学生心理健康。我们致力于营造健康向上的心理环境，守护学生心理健康。'
    },
    '就业创业部': {
        image: '1.jpg',
        description: '就业创业部负责就业信息发布、创业项目指导、职业规划咨询和组织招聘活动。我们为学生提供就业创业指导，助力学生实现职业梦想。'
    },
    '联络协调部': {
        image: '1.jpg',
        description: '联络协调部负责部门协调沟通、对外联络交流、活动统筹安排和资源整合调配。我们搭建沟通桥梁，促进协同合作，提高工作效率。'
    },
    '权益保障部': {
        image: '1.jpg',
        description: '权益保障部致力于维护学生权益、收集学生意见、权益问题反馈和校园提案建议。我们是学生权益的守护者，为学生发声，解决实际问题。'
    },
    '学风建设部': {
        image: '1.jpg',
        description: '学风建设部负责学风建设监督、考勤检查管理、学习氛围营造和学业帮扶指导。我们致力于营造良好学习氛围，促进学风建设。'
    },
    '校园文明部': {
        image: '1.jpg',
        description: '校园文明部负责文明行为督导、校园秩序维护、行为规范宣传和文明寕室评比。我们倡导文明行为，共建和谐校园。'
    },
    '女生部': {
        image: '1.jpg',
        description: '女生部致力于女生权益维护、女生活动组织、宿舍文化建设和女生成长关怀。我们关注女生需求，呵护女生成长，展现女生风采。'
    },
    '安全部': {
        image: '1.jpg',
        description: '安全部负责校园安全检查、安全知识宣传、应急事件处理和安全隐患排查。我们守护校园安全，为师生创造安全和谐的学习生活环境。'
    },
    '资助服务部': {
        image: '1.jpg',
        description: '资助服务部负责贫困生资助、勤工助学管理、助学金发放和困难学生帮扶。我们传递温暖关怀，帮助困难学生顺利完成学业。'
    }
};

// 为所有部门项添加点击事件
const deptItems = document.querySelectorAll('.dept-item');
deptItems.forEach(item => {
    item.addEventListener('click', function() {
        const deptName = this.getAttribute('data-dept');
        const deptInfo = departmentData[deptName];
        
        if (deptInfo) {
            modalTitle.textContent = deptName;
            modalImage.src = deptInfo.image;
            modalDescription.textContent = deptInfo.description;
            deptModal.style.display = 'block';
        }
    });
});

// 关闭弹窗
modalClose.addEventListener('click', () => {
    deptModal.style.display = 'none';
});

// 社团弹窗功能
const clubModal = document.getElementById('clubModal');
const clubModalTitle = document.getElementById('clubModalTitle');
const clubModalImage = document.getElementById('clubModalImage');
const clubModalDescription = document.getElementById('clubModalDescription');
const clubModalClose = document.getElementById('clubModalClose');

// 社团信息数据库
const clubData = {
    '植物保护社团': {
        image: '1.jpg',
        description: '是一个专注于植物健康与病虫害防治的专业学术社团。我们定期组织田间调查、实验室研究、学术讲座等活动植物保护社团成立于2018年，是一个专注于植物健康与病虫害防治的专业学术社团。我们定期组织田间调查、实验室研究、学术讲座等活动，为同学们提供理论学习与实践操作相结合的平台。社团成员在导师指导下，参与多项科研课题，在植物病理学、昆虫学、农药学等领域积累了丰富经验。我们的目标是培养具有专业素养的植保人才，为现代农业发展贡献力量。'
    },
    '昆虫爱好者社团': {
        image: '1.jpg',
        description: '昆虫爱好者社团是一个充满探索精神的兴趣组织。我们热爱自然，痴迷于昆虫世界的奥秘。社团定期组织野外考察，观察昆虫的生活习性；开展昆虫标本制作课程，学习专业的采集与保存技术；举办昆虫摄影比赛，记录昆虫的美丽瞬间；开展科普讲座，向公众传播昆虫知识。在这里，你将发现一个微小却精彩的世界，感受生命的多样性与奇妙。'
    },
    '无人机社团': {
        image: '1.jpg',
        description: '无人机社团是科技与创新的聚集地。我们专注于无人机技术的学习与应用，为成员提供从入门到精通的系统培训。社团拥有多种型号的无人机设备，定期组织飞行训练、航拍实践、竞速比赛等活动。我们特别关注无人机在智慧农业中的应用，如植保作业、农田监测、作物长势分析等，致力于将科技与农业深度融合。加入我们，一起翑翔天空，探索无人机的无限可能！'
    },
    '种子社团': {
        image: '1.jpg',
        description: '种子社团是一个专注于种质资源保护与育种技术的专业实践社团。种子是农业的芝片，我们深知其重要性。社团与多个科研实验室合作，参与种质资源收集、保存与评价工作；学习杂交育种、分子标记辅助选择等现代育种技术；开展田间试验，观察不同品种的农艺性状。我们还积极参与科技下乡活动，向农民推广优良品种。在这里，你将见证一粒种子的力量，体验育种工作的艰辛与喜悦。'
    },
    '器乐社团': {
        image: '1.jpg',
        description: '器乐社团是校园文化生活的重要组成部分，是音乐爱好者的温馨家园。无论你是初学者还是资深演奏者，这里都欢迎你。社团涵盖钢琴、吉他、古筝、二胡、笛子、小提琴等多种乐器，定期开展演奏技巧培训、音乐理论学习、合奏排练等活动。我们每学期举办专场音乐会，为成员提供展示才华的舞台。在紧张的学习之余，让音乐陶冶情操，舒缓压力，丰富生活。加入我们，用音乐点亮青春！'
    }
};

// 为所有社团项添加点击事件
const clubItems = document.querySelectorAll('.club-item');
clubItems.forEach(item => {
    item.addEventListener('click', function() {
        const clubName = this.getAttribute('data-club');
        const clubInfo = clubData[clubName];
        
        if (clubInfo) {
            clubModalTitle.textContent = clubName;
            clubModalImage.src = clubInfo.image;
            clubModalDescription.textContent = clubInfo.description;
            clubModal.style.display = 'block';
        }
    });
});

// 关闭社团弹窗
clubModalClose.addEventListener('click', () => {
    clubModal.style.display = 'none';
});

// 教学楼弹窗功能
const buildingModal = document.getElementById('buildingModal');
const buildingModalTitle = document.getElementById('buildingModalTitle');
const buildingFloors = document.getElementById('buildingFloors');
const buildingModalClose = document.getElementById('buildingModalClose');

// 教学楼楼层信息数据
const buildingData = {
    '第一教学楼': {
        floors: [
            { name: '一楼', image: '1.jpg' },
            { name: '二楼', image: '1.jpg' },
            { name: '三楼', image: '1.jpg' },
            { name: '四楼', image: '1.jpg' },
            { name: '五楼', image: '1.jpg' }
        ]
    },
    '第二教学楼': {
        floors: [
            { name: '一楼', image: '1.jpg' },
            { name: '二楼', image: '1.jpg' },
            { name: '三楼', image: '1.jpg' },
            { name: '四楼', image: '1.jpg' },
            { name: '五楼', image: '1.jpg' }
        ]
    },
    '第三教学楼': {
        floors: [
            { name: '一楼', image: '1.1.jpg' },
            { name: '二楼', image: '1.2.png' },
            { name: '三楼', image: '1.3.png' },
            { name: '四楼', image: '1.4.png' },
            { name: '五楼', image: '1.5.png' }
        ]
    }
};

// 为所有教学楼项添加点击事件
const classroomItems = document.querySelectorAll('.classroom-item');
classroomItems.forEach(item => {
    item.addEventListener('click', function() {
        const buildingName = this.getAttribute('data-building');
        const buildingInfo = buildingData[buildingName];
        
        if (buildingInfo) {
            buildingModalTitle.textContent = buildingName;
            
            // 清空楼层列表
            buildingFloors.innerHTML = '';
            
            // 创建楼层列表
            const floorList = document.createElement('ul');
            floorList.className = 'floor-list-modal';
            
            buildingInfo.floors.forEach((floor, index) => {
                const floorItem = document.createElement('li');
                floorItem.className = 'floor-item-modal';
                
                // 判断是字符串还是对象
                if (typeof floor === 'string') {
                    floorItem.textContent = floor;
                } else {
                    floorItem.textContent = floor.name;
                    floorItem.style.cursor = 'pointer';
                    
                    // 为有图片的楼层添加点击事件
                    floorItem.addEventListener('click', (e) => {
                        e.stopPropagation();
                        showFloorImage(floor.image, `${buildingName} - ${floor.name}`);
                    });
                }
                
                floorList.appendChild(floorItem);
            });
            
            buildingFloors.appendChild(floorList);
            buildingModal.style.display = 'block';
        }
    });
});

// 显示楼层图片功能
function showFloorImage(imagePath, title) {
    // 创建全屏遮罩
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.95);
        z-index: 10000;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        cursor: zoom-out;
        animation: fadeIn 0.3s ease;
    `;
    
    // 创建标题
    const imageTitle = document.createElement('div');
    imageTitle.textContent = title;
    imageTitle.style.cssText = `
        color: white;
        font-size: 1.5rem;
        margin-bottom: 20px;
        font-weight: 600;
    `;
    
    // 创建放大图片
    const enlargedImg = document.createElement('img');
    enlargedImg.src = imagePath;
    enlargedImg.style.cssText = `
        max-width: 90%;
        max-height: 80%;
        border-radius: 10px;
        box-shadow: 0 10px 50px rgba(0, 0, 0, 0.8);
        animation: slideDown 0.3s ease;
    `;
    
    overlay.appendChild(imageTitle);
    overlay.appendChild(enlargedImg);
    document.body.appendChild(overlay);
    
    // 点击遮罩关闭
    overlay.addEventListener('click', () => {
        overlay.style.opacity = '0';
        setTimeout(() => overlay.remove(), 300);
    });
}

// 关闭教学楼弹窗
buildingModalClose.addEventListener('click', () => {
    buildingModal.style.display = 'none';
});

// 点击弹窗外部关闭（更新）
window.addEventListener('click', (e) => {
    if (e.target === deptModal) {
        deptModal.style.display = 'none';
    }
    if (e.target === clubModal) {
        clubModal.style.display = 'none';
    }
    if (e.target === buildingModal) {
        buildingModal.style.display = 'none';
    }
    if (e.target === areaModal) {
        areaModal.style.display = 'none';
    }
});

// 校园区域弹窗功能
const areaModal = document.getElementById('areaModal');
const areaModalTitle = document.getElementById('areaModalTitle');
const areaModalDescription = document.getElementById('areaModalDescription');
const areaModalClose = document.getElementById('areaModalClose');

const areaData = {
    '教学区': '包含A、B、C、D四栋教学楼，位于校园中心区域。这里是学生学习的主要场所，配备现代化的多媒体教室、实验室和自习室。每栋楼都有电梯、空调和免费WiFi，为学生提供舒适的学习环境。',
    '宿舍区': '学生公寓1-12号楼，位于校园东侧。宿舍区环境优美，设施齐全，每间宿舍配有独立卫浴间、阳台、空调和热水器。楼下设有洗衣房、开水房和学习室，生活设施便利。宿舍区实行门禁管理，安全有保障。',
    '图书馆': '5层建筑，藏书300万册，位于校园西侧。图书馆分为借阅区、阅览区、自习区和电子阅览室。开放时间为周一至周日 6:30-22:30。馆内环境安静，设有个人学习座位、3000个，是学习和查询资料的理想场所。',
    '餐饮区': '三个食堂及美食广场，分布于各个区域。第一食堂主营中式餐饮，第二食堂提供地方风味，美食广场有各种小吃、快餐。所有食堂均支持校园卡和移动支付，价格实惠，菜品丰富，干净卫生。',
    '运动场馆': '体育馆、操场、篮球场，位于校园北侧。体育馆内有羽毛球场、乒乓球台、健身房等。室外运动场包括400米标准跑道、足球场、10个篮球场和6个网球场。全部对学生免费开放，是锻炼身体的好去处。',
    '行政办公': '行政楼、办公楼，位于校园南门。这里集中了学校各行政部门，包括教务处、学生处、财务处等。学生办理各类手续、咨询问题都可以到这里。办公时间：周一至周五 8:30-17:30。'
};

const areaItems = document.querySelectorAll('.area-item');
areaItems.forEach(item => {
    item.addEventListener('click', function() {
        const areaName = this.getAttribute('data-area');
        const areaInfo = areaData[areaName];
        
        if (areaInfo) {
            areaModalTitle.textContent = areaName;
            areaModalDescription.textContent = areaInfo;
            areaModal.style.display = 'block';
        }
    });
});

areaModalClose.addEventListener('click', () => {
    areaModal.style.display = 'none';
});

// 校园地图点击放大功能
const campusMapImage = document.getElementById('campusMapImage');
if (campusMapImage) {
    campusMapImage.addEventListener('click', () => {
        // 创建全屏遮罩
        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            z-index: 9999;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: zoom-out;
            animation: fadeIn 0.3s ease;
        `;
        
        // 创建放大图片
        const enlargedImg = document.createElement('img');
        enlargedImg.src = campusMapImage.src;
        enlargedImg.style.cssText = `
            max-width: 95%;
            max-height: 95%;
            border-radius: 10px;
            box-shadow: 0 10px 50px rgba(0, 0, 0, 0.5);
            animation: slideDown 0.3s ease;
        `;
        
        overlay.appendChild(enlargedImg);
        document.body.appendChild(overlay);
        
        // 点击遮罩关闭
        overlay.addEventListener('click', () => {
            overlay.style.opacity = '0';
            setTimeout(() => overlay.remove(), 300);
        });
    });
}



