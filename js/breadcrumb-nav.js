/**
 * Breadcrumb Navigation Component
 * Automatically generates breadcrumbs based on page hierarchy
 * Usage: Include this script and add <div id="breadcrumb"></div> to your page
 */

(function() {
  'use strict';

  // Page hierarchy and titles
  const pageHierarchy = {
    'index.html': { title: 'Home', parent: null },
    
    // Main pages
    'about.html': { title: 'About', parent: 'index.html' },
    'vision.html': { title: 'Vision', parent: 'index.html' },
    'community.html': { title: 'Community', parent: 'index.html' },
    'books.html': { title: 'Books', parent: 'index.html' },
    'projects.html': { title: 'Projects', parent: 'index.html' },
    'timeline.html': { title: 'Timeline', parent: 'index.html' },
    
    // Platform pages
    'platform.html': { title: 'Platform', parent: 'index.html' },
    'ai-tools.html': { title: 'AI Tools', parent: 'platform.html' },
    'code-generator.html': { title: 'Code Generator', parent: 'platform.html' },
    'analytics.html': { title: 'Analytics', parent: 'platform.html' },
    'advanced-analytics.html': { title: 'Advanced Analytics', parent: 'analytics.html' },
    
    // AI & Tech pages
    'ai-twins.html': { title: 'AI Twins', parent: 'index.html' },
    'ai-twins-demo.html': { title: 'AI Twins Demo', parent: 'ai-twins.html' },
    'soulcore.html': { title: 'SoulCore', parent: 'index.html' },
    'soulcore-lab.html': { title: 'SoulCore Lab', parent: 'soulcore.html' },
    'evolution.html': { title: 'Evolution', parent: 'soulcore.html' },
    'api.html': { title: 'API', parent: 'index.html' },
    
    // TerraSolar pages
    'methodology.html': { title: 'Methodology', parent: 'index.html' },
    'terrasolar-cerebra.html': { title: 'TerraSolar Cerebra', parent: 'index.html' },
    
    // Dashboard pages
    'dashboard.html': { title: 'Dashboard', parent: 'index.html' },
    'web3-dashboard.html': { title: 'Web3 Dashboard', parent: 'dashboard.html' },
    'settings.html': { title: 'Settings', parent: 'dashboard.html' },
    
    // User pages
    'login.html': { title: 'Login', parent: 'index.html' },
    'signup.html': { title: 'Sign Up', parent: 'index.html' },
    'join.html': { title: 'Join', parent: 'index.html' },
    'upgrade-plan.html': { title: 'Upgrade Plan', parent: 'index.html' },
    
    // Education & Community
    'ai-courses.html': { title: 'AI Courses', parent: 'community.html' },
    'ai-society-monetization.html': { title: 'AI Society', parent: 'community.html' },
    
    // Legal
    'privacy-policy.html': { title: 'Privacy Policy', parent: 'index.html' },
    
    // Demo/Test
    'test-functionality.html': { title: 'Test Page', parent: 'index.html' },
    'services.html': { title: 'Services', parent: 'index.html' },
  };

  /**
   * Get current page filename from URL
   */
  function getCurrentPage() {
    const path = window.location.pathname;
    const filename = path.split('/').pop() || 'index.html';
    return filename || 'index.html';
  }

  /**
   * Build breadcrumb trail for current page
   */
  function buildBreadcrumbTrail(currentPage) {
    const trail = [];
    let page = currentPage;

    // Build trail from current page back to home
    while (page && pageHierarchy[page]) {
      const pageInfo = pageHierarchy[page];
      trail.unshift({
        title: pageInfo.title,
        href: page
      });
      page = pageInfo.parent;
    }

    return trail;
  }

  /**
   * Render breadcrumb HTML
   */
  function renderBreadcrumb(trail) {
    if (trail.length <= 1) {
      // Don't show breadcrumbs on home page or if trail is too short
      return '';
    }

    let html = '<nav class="breadcrumb" aria-label="Breadcrumb">';
    html += '<ol class="breadcrumb-list">';

    trail.forEach((item, index) => {
      const isLast = index === trail.length - 1;
      html += '<li class="breadcrumb-item">';
      
      if (isLast) {
        // Current page - no link
        html += `<span class="breadcrumb-current" aria-current="page">${item.title}</span>`;
      } else {
        // Parent pages - with link
        html += `<a href="${item.href}" class="breadcrumb-link">${item.title}</a>`;
      }
      
      if (!isLast) {
        html += '<span class="breadcrumb-separator" aria-hidden="true"> / </span>';
      }
      
      html += '</li>';
    });

    html += '</ol>';
    html += '</nav>';

    return html;
  }

  /**
   * Inject breadcrumb CSS
   */
  function injectBreadcrumbStyles() {
    const styleId = 'breadcrumb-styles';
    
    // Don't inject if already present
    if (document.getElementById(styleId)) {
      return;
    }

    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = `
      .breadcrumb {
        padding: 1rem 0;
        margin-bottom: 2rem;
      }

      .breadcrumb-list {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        list-style: none;
        padding: 0;
        margin: 0;
        gap: 0.5rem;
      }

      .breadcrumb-item {
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }

      .breadcrumb-link {
        color: rgba(255, 255, 255, 0.7);
        text-decoration: none;
        transition: all 0.2s ease;
        font-size: 0.9rem;
      }

      .breadcrumb-link:hover {
        color: #FFD700;
        text-decoration: underline;
      }

      .breadcrumb-current {
        color: #FFD700;
        font-weight: 600;
        font-size: 0.9rem;
      }

      .breadcrumb-separator {
        color: rgba(255, 255, 255, 0.4);
        user-select: none;
      }

      /* Mobile responsive */
      @media (max-width: 768px) {
        .breadcrumb {
          padding: 0.5rem 0;
          margin-bottom: 1rem;
        }

        .breadcrumb-link,
        .breadcrumb-current {
          font-size: 0.85rem;
        }

        .breadcrumb-separator {
          font-size: 0.85rem;
        }
      }
    `;

    document.head.appendChild(style);
  }

  /**
   * Initialize breadcrumb navigation
   */
  function initBreadcrumb() {
    // Find breadcrumb container
    const container = document.getElementById('breadcrumb');
    
    if (!container) {
      console.warn('Breadcrumb: No element with id="breadcrumb" found');
      return;
    }

    // Get current page
    const currentPage = getCurrentPage();

    // Check if page is in hierarchy
    if (!pageHierarchy[currentPage]) {
      console.warn(`Breadcrumb: Page "${currentPage}" not found in hierarchy`);
      return;
    }

    // Build and render breadcrumb
    const trail = buildBreadcrumbTrail(currentPage);
    const breadcrumbHTML = renderBreadcrumb(trail);

    if (breadcrumbHTML) {
      // Inject styles
      injectBreadcrumbStyles();

      // Insert breadcrumb HTML
      container.innerHTML = breadcrumbHTML;
      container.style.display = 'block';
    } else {
      container.style.display = 'none';
    }
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initBreadcrumb);
  } else {
    initBreadcrumb();
  }

  // Export for manual initialization if needed
  window.BreadcrumbNav = {
    init: initBreadcrumb,
    addPage: function(filename, title, parent) {
      pageHierarchy[filename] = { title, parent };
    }
  };
})();
