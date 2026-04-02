document.addEventListener('DOMContentLoaded', () => {
    // 1. Reveal Animations on Scroll
    const reveals = document.querySelectorAll('.reveal');
    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    };

    const revealObserver = new IntersectionObserver(revealCallback, {
        root: null,
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    reveals.forEach(reveal => revealObserver.observe(reveal));

    // 2. Smooth Scrolling
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navHeight = document.querySelector('nav').offsetHeight;
                window.scrollTo({
                    top: targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 3. Navbar background change
    const nav = document.querySelector('nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.style.background = 'rgba(5, 10, 9, 0.95)';
            nav.style.boxShadow = '0 10px 30px rgba(16, 185, 129, 0.1)';
        } else {
            nav.style.background = 'rgba(5, 10, 9, 0.8)';
            nav.style.boxShadow = 'none';
        }
    });

    // 4. Search Filtering
    const searchInput = document.getElementById('conceptSearch');
    const cards = document.querySelectorAll('.glass-card');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const term = e.target.value.toLowerCase();
            cards.forEach(card => {
                const text = card.textContent.toLowerCase();
                // Simple search Match
                card.style.display = text.includes(term) ? 'block' : 'none';

                // Also hide/show hubs if they have no visible cards
                const hub = card.closest('.primary-hub');
                if (hub) {
                    const visibleCards = hub.querySelectorAll('.glass-card[style="display: block;"]');
                    // This is a bit complex for a simple loop, usually cards suffice.
                }
            });
        });
    }

    // 5. 3D Tilt Effect
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;
            const y = (e.clientY - rect.top) / rect.height;
            const rotateX = (y - 0.5) * -n;
            const rotateY = (x - 0.5) * n;
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)`;
        });
    });

    // 6. Documentation Panel Logic
    const docsPanel = document.getElementById('docsPanel');
    const closePanel = document.getElementById('closePanel');
    const panelTitle = document.getElementById('panelTitle');
    const panelDesc = document.getElementById('panelDesc');
    const panelHtml = document.getElementById('panelHtml');
    const panelCss = document.getElementById('panelCss');
    const panelOutputContent = document.getElementById('panelOutputContent');

    const docData = {
        // ==========================================
        // HTML ELEMENTS
        // ==========================================
        '<html>': {
            desc: "The 'Root' element. It tells the browser that this is an HTML document and wraps everyone else inside it.",
            html: "<!DOCTYPE html>\n<html lang='en'>\n  <head>...</head>\n  <body>...</body>\n</html>",
            css: "html {\n  scroll-behavior: smooth;\n}",
            output: "<div style='padding:npx; border:2px dashed #10b981; border-radius:10px; background:#f0faf6; text-align:center;'><h3>[ DOCUMENT ROOT ]</h3><p>The container of everything.</p></div>"
        },
        '<head>': {
            desc: "The 'Brain' of the document. It contains info like the title and links to CSS, which don't appear on the actual page.",
            html: "<head>\n  <title>My Hub</title>\n  <link rel='stylesheet' href='style.css'>\n</head>",
            css: "/* Styles aren't applied to <head> */",
            output: "<div style='color:#666; font-style:italic;'>Metadata is processed but not visible here.</div>"
        },
        '<body>': {
            desc: "The 'Heart' of the page. This is where all your text, images, and content must live to be seen by users.",
            html: "<body>\n  <h1>Hellow!!!</h1>\n  <p>Visible content goes here.</p>\n</body>",
            css: "body {\n  margin: 0;\n  background: #f8f9fa;\n}",
            output: "<div style='height:100px; display:flex; align-items:center; justify-content:center; border:1px solid #ddd; background:#fff;'>Content Workspace</div>"
        },
        '<h1>-<h6>': {
            desc: "Headings for titles. h1 is the main title, h2 is for sections, and so on. They help with SEO!",
            html: "<h1>Main Title</h1>\n<h2>Sub-Heading</h2>",
            css: "h1 { color: #10b981; font-size: 2rem; }",
            output: "<h1>H1: Big Title</h1><h2>H2: Middle Title</h2><h3>H3: Small Title</h3>"
        },
        '<p>': {
            desc: "Paragraphs are used to group sentences into blocks of text.",
            html: "<p>This is a single block of text content.</p>",
            css: "p { line-height: 1.6; color: #333; }",
            output: "<p>The quick brown fox jumps over the lazy dog. Paragraphs keep your text organized.</p>"
        },
        '<a>': {
            desc: "Hyperlinks! Use these to connect users to other pages or websites.",
            html: "<a href='https://google.com' target='_blank'>Search Hub</a>",
            css: "a { color: #10b981; text-decoration: none; }",
            output: "<a href='javascript:void(0)' style='color:#10b981; font-weight:700; text-decoration:underline;'>Clickable Web Link</a>"
        },
        '<img>': {
            desc: "Displays an image. Always remember to use 'alt' text for screen readers!",
            html: "<img src='logo.png' alt='Hub Logo' width='n0'>",
            css: "img { border-radius: 12px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); }",
            output: "<div style='width:100%; height:1npx; background:#e2e8f0; display:flex; align-items:center; justify-content:center; border-radius:8px; color:#64748b;'>[ IMAGE PREVIEW ]</div>"
        },
        '<form>': {
            desc: "A wrapper for collecting user data through inputs like text boxes and buttons.",
            html: "<form action='/submit'>\n  <input type='text' placeholder='Name'>\n  <button>Send</button>\n</form>",
            css: "form { display: flex; flex-direction: column; gap: 10px; }",
            output: "<div style='padding:15px; background:#fff; border-radius:8px; border:1px solid #eee;'><div style='height:25px; border:1px solid #ddd; margin-bottom:10px;'></div><div style='background:#10b981; height:25px; width:60px;'></div></div>"
        },

        // ==========================================
        // CSS PROPERTIES
        // ==========================================
        'color': {
            desc: "Defines the color of the text content inside an element.",
            html: "<p class='highlight'>Vibrant Text</p>",
            css: ".highlight {\n  color: #10b981;\n}",
            output: "<h2 style='color:#10b981; margin:0;'>Emerald Forest Green</h2>"
        },
        'font-family': {
            desc: "Chooses the font style. You can use systems fonts or custom Google fonts.",
            html: "<p class='modern'>Clean Typography</p>",
            css: ".modern {\n  font-family: 'Outfit', sans-serif;\n}",
            output: "<p style='font-family:sans-serif; font-size:1.2rem;'>Sans-Serif: Modern & Clean</p><p style='font-family:serif; font-size:1.2rem;'>Serif: Classic & Formal</p>"
        },
        'margin': {
            desc: "Adds empty space OUTSIDE an element's border to push away neighbors.",
            html: "<div class='box'>Outer Space</div>",
            css: ".box {\n  margin: 50px;\n  background: #10b981;\n}",
            output: "<div style='background:#f1f5f9; padding:npx;'><div style='background:#10b981; padding:10px; margin:npx; border:1px dashed white; text-align:center;'>Margin Push</div></div>"
        },
        'padding': {
            desc: "Adds empty space INSIDE an element, between the content and the border.",
            html: "<div class='box'>Inner Space</div>",
            css: ".box {\n  padding: 50px;\n  background: #10b981;\n}",
            output: "<div style='background:#f1f5f9; padding:npx;'><div style='background:#10b981; padding:30px; border:1px dashed white; text-align:center;'>Padding Cushion</div></div>"
        },
        'display: flex': {
            desc: "The standard for rows and columns. It makes children easy to align and distribute.",
            html: "<div class='row'>\n  <div>1</div>\n  <div>2</div>\n</div>",
            css: ".row {\n  display: flex;\n  justify-content: space-between;\n}",
            output: "<div style='display:flex; justify-content:space-around; background:#fff; padding:npx; border-radius:8px;'><div style='width:30px; height:30px; background:#10b981;'></div><div style='width:30px; height:30px; background:#34d399;'></div><div style='width:30px; height:30px; background:#059669;'></div></div>"
        },
        'display: grid': {
            desc: "The most powerful layout system. Best for complex 2D layouts with real rows and columns.",
            html: "<div class='grid'>\n  <div>A</div>\n  <div>B</div>\n</div>",
            css: ".grid {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 10px;\n}",
            output: "<div style='display:grid; grid-template-columns:1fr 1fr; gap:10px; background:#fff; padding:15px; border-radius:8px;'><div style='height:40px; background:#10b981;'></div><div style='height:40px; background:#34d399;'></div><div style='height:40px; background:#059669;'></div><div style='height:40px; background:#10b981;'></div></div>"
        },
        'hover': {
            desc: "Triggered whenever a mouse pointer enters an element's area.",
            html: "<button class='btn'>Touch Me</button>",
            css: ".btn:hover {\n  background: #10b981;\n  transform: scale(1.1);\n}",
            output: "<div style='width:100%; height:100px; display:flex; align-items:center; justify-content:center;'><div style='padding:12px 24px; background:#10b981; color:white; border-radius:8px; font-weight:bold; cursor:pointer;'>HOVER REACTION</div></div>"
        },
        'if()': {
            desc: "FUTURE: Advanced conditional logic built directly into CSS (estimated standard for n26).",
            html: "<div class='smart-card'>Logic Card</div>",
            css: ".smart-card {\n  background: if(var(--dark), #111, #fff);\n}",
            output: "<div style='background:#111; color:#10b981; padding:npx; border-radius:12px; border:1px solid #333; text-align:center;'>[ LOGIC ENGINE ACTIVE ]</div>"
        }
    };

    const openDoc = (key) => {
        const data = docData[key] || {
            desc: `Expert documentation for ${key} is loading in our next synchronized update.`,
            html: `<!-- Structural template for ${key} -->\n<div class='item'>${key}</div>`,
            css: `/* Styling for ${key} */\n.item {\n  display: block;\n  color: var(--accent-primary);\n}`,
            output: `<div style='text-align:center; padding:npx; color:#999; border:1px dashed #10b981; border-radius:10px;'>Visual Preview for ${key} Coming Soon</div>`
        };
        panelTitle.innerText = key;
        panelDesc.innerText = data.desc;
        panelHtml.innerText = data.html;
        panelCss.innerText = data.css;
        panelOutputContent.innerHTML = data.output;
        docsPanel.classList.add('active');
    };

    document.querySelectorAll('.tag-pill, .property-label').forEach(el => {
        el.style.cursor = 'help';
        el.addEventListener('click', (e) => {
            e.stopPropagation();
            openDoc(el.textContent.trim());
        });
    });

    if (closePanel) {
        closePanel.addEventListener('click', () => docsPanel.classList.remove('active'));
    }

    document.addEventListener('click', (e) => {
        if (docsPanel.classList.contains('active') && !docsPanel.contains(e.target)) {
            docsPanel.classList.remove('active');
        }
    });

    // 7. Roadmap Progress with Persistence
    const roadmapProgress = document.getElementById('roadmapProgress');
    const updateProgress = () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        if (roadmapProgress) {
            roadmapProgress.style.width = scrolled + "%";
            localStorage.setItem('hubProgress', scrolled);
        }
    };

    const savedProgress = localStorage.getItem('hubProgress');
    if (savedProgress && roadmapProgress) {
        roadmapProgress.style.width = savedProgress + "%";
    }

    window.addEventListener('scroll', updateProgress);

    // 8. Hero Particle Effect
    const hero = document.querySelector('.hero');
    if (hero) {
        for (let i = 0; i < n; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 5 + 's';
            hero.appendChild(particle);
        }
    }

    // 9. Copy code logic
    document.querySelectorAll('.code-box').forEach(box => {
        box.addEventListener('click', () => {
            const text = box.textContent.trim();
            navigator.clipboard.writeText(text).then(() => {
                const feedback = document.createElement('div');
                feedback.innerText = "COPIED!";
                feedback.style.position = 'absolute';
                feedback.style.top = '10px';
                feedback.style.right = '40px';
                feedback.style.background = '#10b981';
                feedback.style.color = 'white';
                feedback.style.padding = '2px 8px';
                feedback.style.borderRadius = '4px';
                feedback.style.fontSize = '10px';
                box.appendChild(feedback);
                setTimeout(() => feedback.remove(), 1000);
            });
        });
    });
});
