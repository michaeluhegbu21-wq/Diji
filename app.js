
      const products = [
        {
          id: 1,
          name: "The 7 Habits of Highly Effective People (eBook)",
          cat: "E-books",
          key: "ebooks",
          price: 2500,
          rating: 4.8,
          sold: "1.2k",
          icon: "📖",
          style: "dark",
        },
        {
          id: 2,
          name: "Modern Business Website Template",
          cat: "Website Templates",
          key: "templates",
          price: 8000,
          rating: 4.6,
          sold: "860",
          icon: "🖥️",
          style: "purple",
        },
        {
          id: 3,
          name: "Yoast SEO Premium Plugin",
          cat: "Website Plugins",
          key: "plugins",
          price: 12000,
          rating: 4.7,
          sold: "540",
          icon: "🧩",
          style: "blue",
        },
        {
          id: 4,
          name: "Complete Web Development Course",
          cat: "Online Courses",
          key: "courses",
          price: 15000,
          rating: 4.9,
          sold: "1.8k",
          icon: "🎓",
          style: "teal",
        },
        {
          id: 5,
          name: "Forex Trading Strategy eBook + Video",
          cat: "E-books",
          key: "ebooks",
          price: 5000,
          rating: 4.5,
          sold: "420",
          icon: "📈",
          style: "greenbg",
        },
        {
          id: 6,
          name: "Premium WordPress Theme (Multipurpose)",
          cat: "Website Templates",
          key: "templates",
          price: 10000,
          rating: 4.6,
          sold: "620",
          icon: "◈",
          style: "purple",
        },
        {
          id: 7,
          name: "Video Editing Course (Premiere Pro)",
          cat: "Online Courses",
          key: "courses",
          price: 12000,
          rating: 4.7,
          sold: "980",
          icon: "🎬",
          style: "pink",
        },
        {
          id: 8,
          name: "Website Security Plugin (Wordfence Premium)",
          cat: "Website Plugins",
          key: "plugins",
          price: 9000,
          rating: 4.4,
          sold: "390",
          icon: "🛡️",
          style: "navy",
        },
        {
          id: 9,
          name: "Instagram Content Creator Bundle",
          cat: "Graphics & Design",
          key: "graphics",
          price: 6500,
          rating: 4.8,
          sold: "710",
          icon: "🎨",
          style: "orange",
        },
        {
          id: 10,
          name: "1000+ ChatGPT Prompts Guide",
          cat: "E-books",
          key: "ebooks",
          price: 3500,
          rating: 4.9,
          sold: "2.1k",
          icon: "🤖",
          style: "teal",
        },
        {
          id: 11,
          name: "Royalty-Free Music Starter Pack",
          cat: "Music & Audio",
          key: "audio",
          price: 4500,
          rating: 4.7,
          sold: "530",
          icon: "🎵",
          style: "blue",
        },
        {
          id: 12,
          name: "React Admin Dashboard UI Kit",
          cat: "Website Templates",
          key: "templates",
          price: 11000,
          rating: 4.9,
          sold: "410",
          icon: "⚛️",
          style: "navy",
        },
        {
          id: 13,
          name: "Moonblade: The First Quest (Digital Comic)",
          cat: "Comics & Manga",
          key: "comics",
          price: 1800,
          rating: 4.9,
          sold: "324",
          icon: "🌙",
          style: "purple",
          description: "An original fantasy adventure comic.",
        },
        {
          id: 14,
          name: "Neon Guardians: Episode One",
          cat: "Comics & Manga",
          key: "comics",
          price: 2200,
          rating: 4.8,
          sold: "215",
          icon: "⚡",
          style: "blue",
          description: "An original sci-fi comic adventure.",
        },
        {
          id: 15,
          name: "Little Legends: The Hidden City",
          cat: "Comics & Manga",
          key: "comics",
          price: 1500,
          rating: 4.7,
          sold: "168",
          icon: "🏙️",
          style: "pink",
          description: "An original all-ages illustrated story.",
        },
      ];

      const customProducts = (() => {
        try {
          return JSON.parse(
            localStorage.getItem("diji_custom_products") || "[]",
          );
        } catch {
          return [];
        }
      })();
      products.push(...customProducts);
      let promotedIds = (() => {
        try {
          return JSON.parse(
            localStorage.getItem("diji_promoted_ids") || "[2,4,10]",
          );
        } catch {
          return [2, 4, 10];
        }
      })();
      let campaigns = (() => {
        try {
          return JSON.parse(localStorage.getItem("diji_ad_campaigns") || "[]");
        } catch {
          return [];
        }
      })();
      function saveCampaigns() {
        localStorage.setItem("diji_ad_campaigns", JSON.stringify(campaigns));
      }
      function campaignFor(id) {
        return campaigns.find((c) => c.productId === id);
      }
      function trackAdClick(id) {
        const c = campaignFor(id);
        if (c) {
          c.clicks = (c.clicks || 0) + 1;
          saveCampaigns();
        }
      }

      const grid = document.getElementById("productGrid"),
        searchInput = document.getElementById("searchInput"),
        searchBtn = document.getElementById("searchBtn"),
        sortSelect = document.getElementById("sortSelect"),
        toast = document.getElementById("toast");
      let currentCategory = "browse";
      const getJSON = (key, fallback) => {
        try {
          return JSON.parse(localStorage.getItem(key)) ?? fallback;
        } catch {
          return fallback;
        }
      };
      let saved = getJSON("dij_saved", []),
        cart = getJSON("dij_cart", []),
        users = getJSON("dij_users", []),
        currentUser = getJSON("dij_current_user", null);

      function money(n) {
        return "₦" + Number(n).toLocaleString("en-NG");
      }
      function showToast(message) {
        toast.textContent = message;
        toast.classList.add("show");
        clearTimeout(window.toastTimer);
        window.toastTimer = setTimeout(
          () => toast.classList.remove("show"),
          2200,
        );
      }
      function saveState() {
        localStorage.setItem("dij_saved", JSON.stringify(saved));
        localStorage.setItem("dij_cart", JSON.stringify(cart));
        localStorage.setItem("dij_users", JSON.stringify(users));
        localStorage.setItem("dij_current_user", JSON.stringify(currentUser));
        localStorage.setItem(
          "diji_custom_products",
          JSON.stringify(products.filter((p) => p.custom)),
        );
        localStorage.setItem("diji_promoted_ids", JSON.stringify(promotedIds));
        saveCampaigns();
      }
      function currentSaved() {
        return saved;
      }
      function updateCounts() {
        const saveCount = document.getElementById("saveCount");
        if (saveCount) saveCount.textContent = saved.length;
        const mobileSaveCount = document.getElementById("mobileSaveCount");
        if (mobileSaveCount) mobileSaveCount.textContent = saved.length;
        const mobileCartCount = document.getElementById("mobileCartCount");
        if (mobileCartCount) mobileCartCount.textContent = cart.length;
      }

      function render(list = products) {
        grid.innerHTML = "";
        if (!list.length) {
          grid.innerHTML = `<div style="grid-column:1/-1;background:#fff;border:1px solid #e5ebe8;border-radius:10px;padding:40px;text-align:center;color:#75817c"><div style="font-size:35px">🔎</div><h3>No products found</h3><p>Try another search or category.</p></div>`;
          return;
        }
        list.forEach((p) => {
          const card = document.createElement("article");
          card.className = "product-card";
          const liked = saved.includes(p.id);
          card.innerHTML = `<div class="product-image ${p.style}" style="${p.image ? `background-image:linear-gradient(0deg,rgba(3,27,17,.2),rgba(3,27,17,.02)),url('${p.image}');background-size:cover;background-position:center` : ""}"><button class="heart ${liked ? "liked" : ""}" data-id="${p.id}" aria-label="Save product">${liked ? "♥" : "♡"}</button><div class="product-icon">${p.icon}</div><span class="badge">${p.custom ? "CREATOR LISTING" : p.cat}</span></div><div class="product-info"><h3>${p.name}</h3><span class="product-cat">${p.cat}</span><div class="price">${money(p.price)}</div><div class="rating"><strong>★ ${p.rating}</strong> &nbsp;(${Math.floor(p.rating * 20)}) · ${p.sold} sold</div><button class="buy-btn" data-buy="${p.id}">Add to Cart</button><button class="review-btn" data-reviews="${p.id}">⭐ Read reviews / Write a review</button></div>`;
          grid.appendChild(card);
        });
      }
      function renderFeaturedAds() {
        const box = document.getElementById("featuredAdGrid");
        if (!box) return;
        const items = promotedIds
          .map((id) => products.find((p) => p.id === id))
          .filter(Boolean)
          .slice(0, 6);
        if (!sessionStorage.getItem("diji_feature_impression")) {
          items.forEach((p) => {
            const c = campaignFor(p.id);
            if (c) c.views = (c.views || 0) + 1;
          });
          saveCampaigns();
          sessionStorage.setItem("diji_feature_impression", "1");
        }
        if (!items.length) {
          box.innerHTML =
            '<div class="ad-info-strip">No promoted products yet. Creators can feature a listing from the seller form.</div>';
          return;
        }
        box.innerHTML = items
          .map((p) => {
            const cover = (p.name || p.cat || "Digital product")
              .replace(/[<>"']/g, "")
              .slice(0, 42);
            const desc = (
              p.description || `${p.cat} from the Diji creator marketplace.`
            )
              .replace(/[<>]/g, "")
              .slice(0, 105);
            const campaign = campaignFor(p.id);
            const coverBg = p.image
              ? `style="--cover-image:url(&quot;${String(p.image)
                  .replace(/&/g, "&amp;")
                  .replace(/&quot;/g, "")} &quot;)"`
              : "";
            return `<article class="ad-card"><div class="ad-art" data-cover="${cover.replace(/&/g, "&amp;")}"></div><div class="ad-body"><span class="ad-seller">${(p.store || "Diji Creator").replace(/[<>]/g, "")}</span><h3>${p.name}</h3><p>${desc}</p><div class="ad-meta"><span>${money(p.price)}</span><button data-feature-buy="${p.id}">View product</button></div></div></article>`;
          })
          .join("");
      }
      document
        .getElementById("featuredAdGrid")
        .addEventListener("click", (e) => {
          const b = e.target.closest("[data-feature-buy]");
          if (!b) return;
          const id = Number(b.dataset.featureBuy);
          trackAdClick(id);
          const alreadyInCart = cart.includes(id);
          if (!alreadyInCart) cart.push(id);
          saveState();
          updateCounts();
          renderCart();
          openCart();
          showToast(
            alreadyInCart
              ? "This product is already in your cart 🛒"
              : "Featured product added to your cart 🛒",
          );
        });
      function filterProducts() {
        const term = searchInput.value.trim().toLowerCase();
        const title = document.getElementById("productsTitle"),
          kicker = document.getElementById("productsKicker"),
          viewAllBtn = document.getElementById("viewAll");
        if (currentCategory === "browse" && !term) {
          title.textContent = "Choose a category to explore";
          kicker.textContent = "BROWSE BY CATEGORY";
          viewAllBtn.textContent = "View all products →";
          render([]);
          grid.innerHTML = `<div style="grid-column:1/-1;background:#fff;border:1px solid #e5ebe8;border-radius:12px;padding:34px 20px;text-align:center;color:#75817c"><div style="font-size:36px">🗂️</div><h3 style="color:#24352d;margin:12px 0 6px">Find exactly what you need</h3><p>Choose E-books, Comics & Manga, Templates, Courses or another category above to see matching products.</p><button class="primary-btn" id="browseAllInline" style="margin-top:10px">View all products →</button></div>`;
          return;
        }
        let list = products.filter(
          (p) =>
            (currentCategory === "all" ||
              currentCategory === "browse" ||
              p.key === currentCategory) &&
            (!term ||
              `${p.name} ${p.cat} ${p.store || ""} ${p.description || ""}`
                .toLowerCase()
                .includes(term)),
        );
        const names = {
          all: "All Digital Products",
          ebooks: "E-books",
          comics: "Comics & Manga",
          templates: "Website Templates",
          plugins: "Website Plugins",
          courses: "Online Courses",
          webinars: "Webinars",
          videos: "Digital Videos",
          software: "Software & Scripts",
          graphics: "Graphics & Design",
          audio: "Music & Audio",
          other: "Other Digital Products",
        };
        title.textContent = term
          ? `Search results for “${searchInput.value.trim()}”`
          : names[currentCategory] || "All Digital Products";
        kicker.textContent =
          currentCategory === "all" ? "EXPLORE DIJI" : "CATEGORY RESULTS";
        viewAllBtn.textContent =
          currentCategory === "all"
            ? "Showing all products ✓"
            : "View all products →";
        switch (sortSelect.value) {
          case "priceLow":
            list.sort((a, b) => a.price - b.price);
            break;
          case "priceHigh":
            list.sort((a, b) => b.price - a.price);
            break;
          case "rating":
            list.sort((a, b) => b.rating - a.rating);
            break;
          default:
            list.sort((a, b) => a.id - b.id);
        }
        render(list);
      }
      function chooseCategory(category) {
        currentCategory = category;
        document
          .querySelectorAll(".side-link")
          .forEach((b) =>
            b.classList.toggle("active", b.dataset.category === category),
          );
        document
          .querySelectorAll(".quick-category")
          .forEach((b) =>
            b.classList.toggle("active", b.dataset.category === category),
          );
        filterProducts();
        document
          .getElementById("products")
          .scrollIntoView({ behavior: "smooth", block: "start" });
      }
      document
        .querySelectorAll("[data-category]")
        .forEach((el) =>
          el.addEventListener("click", () =>
            chooseCategory(el.dataset.category),
          ),
        );
      searchBtn.addEventListener("click", filterProducts);
      searchInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") filterProducts();
      });
      sortSelect.addEventListener("change", filterProducts);

      grid.addEventListener("click", (e) => {
        const heart = e.target.closest(".heart");
        if (heart) {
          const id = Number(heart.dataset.id);
          saved = saved.includes(id)
            ? saved.filter((x) => x !== id)
            : [...saved, id];
          saveState();
          updateCounts();
          filterProducts();
          showToast(
            saved.includes(id)
              ? "Saved to Favorites ❤️"
              : "Removed from Favorites",
          );
          return;
        }
        const buy = e.target.closest("[data-buy]");
        if (buy) {
          const id = Number(buy.dataset.buy);
          const alreadyInCart = cart.includes(id);
          if (!alreadyInCart) cart.push(id);
          saveState();
          updateCounts();
          renderCart();
          openCart();
          showToast(
            alreadyInCart
              ? "This product is already in your cart 🛒"
              : "Added to your cart 🛒 · " +
                  cart.length +
                  " item" +
                  (cart.length === 1 ? "" : "s"),
          );
        }
      });

      const reviewSeeds = {
        1: [
          {
            name: "Ada",
            rating: 5,
            text: "Clear and useful. Easy to read on my phone.",
          },
          {
            name: "Tomi",
            rating: 4,
            text: "Good resource and worth checking out.",
          },
        ],
        13: [
          {
            name: "Mira",
            rating: 5,
            text: "The artwork and world-building pulled me in. Looking forward to the next chapter.",
          },
          {
            name: "Kay",
            rating: 5,
            text: "A fun original fantasy comic. Great for a quick read.",
          },
        ],
        14: [
          {
            name: "Chidi",
            rating: 5,
            text: "Love the sci-fi setting and energetic panels.",
          },
          {
            name: "Nneka",
            rating: 4,
            text: "Cool first episode. I want to see more of the characters.",
          },
        ],
        15: [
          { name: "Sam", rating: 5, text: "A charming illustrated adventure." },
        ],
      };
      let activeReviewProduct = null;
      function reviewKey(id) {
        return "diji_reviews_" + id;
      }
      function getReviews(id) {
        return [...(reviewSeeds[id] || []), ...getJSON(reviewKey(id), [])];
      }
      function escapeReview(s) {
        return String(s).replace(
          /[&<>"']/g,
          (c) =>
            ({
              "&": "&amp;",
              "<": "&lt;",
              ">": "&gt;",
              '"': "&quot;",
              "'": "&#39;",
            })[c],
        );
      }
      function openReviews(id) {
        activeReviewProduct = Number(id);
        const p = products.find((x) => x.id === activeReviewProduct);
        if (!p) return;
        document.getElementById("reviewsTitle").textContent =
          "Reviews: " + p.name;
        renderReviews();
        document.getElementById("reviewsModal").classList.remove("hidden");
      }
      function renderReviews() {
        const items = getReviews(activeReviewProduct),
          avg = items.length
            ? items.reduce((s, r) => s + Number(r.rating || 0), 0) /
              items.length
            : 0;
        const body = document.getElementById("reviewsBody");
        body.innerHTML =
          `<div class="review-summary"><strong style="font-size:25px">${items.length ? avg.toFixed(1) : "New"} ★</strong><div>${items.length} review${items.length === 1 ? "" : "s"}</div></div>` +
          (items.length
            ? items
                .map(
                  (r) =>
                    `<div class="review-row"><strong>${"★".repeat(Number(r.rating) || 0)}${"☆".repeat(5 - (Number(r.rating) || 0))} · ${escapeReview(r.name || "Customer")}</strong><p>${escapeReview(r.text)}</p><small>${r.verified ? "Verified purchase" : "Community demo review"}</small></div>`,
                )
                .join("")
            : "<p>No reviews yet. Be the first to share your thoughts.</p>");
      }
      document.getElementById("productGrid").addEventListener("click", (e) => {
        const b = e.target.closest("[data-reviews]");
        if (b) openReviews(b.dataset.reviews);
      });
      document
        .getElementById("closeReviews")
        .addEventListener("click", () =>
          document.getElementById("reviewsModal").classList.add("hidden"),
        );
      document.getElementById("reviewsModal").addEventListener("click", (e) => {
        if (e.target.id === "reviewsModal")
          e.currentTarget.classList.add("hidden");
      });
      document.getElementById("reviewForm").addEventListener("submit", (e) => {
        e.preventDefault();
        if (!activeReviewProduct) return;
        const items = getJSON(reviewKey(activeReviewProduct), []);
        items.push({
          name: currentUser?.name || "Guest",
          rating: Number(document.getElementById("reviewRating").value),
          text: document.getElementById("reviewText").value.trim(),
          verified: false,
        });
        localStorage.setItem(
          reviewKey(activeReviewProduct),
          JSON.stringify(items),
        );
        document.getElementById("reviewText").value = "";
        renderReviews();
        showToast("Thanks for sharing your review!");
      });
      document
        .getElementById("exploreComics")
        .addEventListener("click", () => chooseCategory("comics"));

      const sellModal = document.getElementById("sellModal");
      function openSell() {
        sellModal.classList.remove("hidden");
      }
      function closeSell() {
        sellModal.classList.add("hidden");
      }
      ["sellBtn", "sideSell", "heroSell", "railSell", "mobileSell"].forEach(
        (id) =>
          document.getElementById(id)?.addEventListener("click", openSell),
      );
      document
        .getElementById("closeModal")
        .addEventListener("click", closeSell);
      sellModal.addEventListener("click", (e) => {
        if (e.target === sellModal) closeSell();
      });
      document
        .getElementById("cancelSellerForm")
        .addEventListener("click", closeSell);
      document
        .getElementById("promoteProductBtn")
        .addEventListener("click", openSell);
      const promoteToggle = document.getElementById("sellerPromote"),
        campaignFields = document.getElementById("campaignFields");
      promoteToggle.addEventListener("change", () => {
        campaignFields.hidden = !promoteToggle.checked;
      });
      const coverFileInput = document.getElementById("sellerProductImageFile"),
        digitalFileInput = document.getElementById("sellerProductFile");
      let selectedCoverData = "";
      coverFileInput.addEventListener("change", () => {
        const f = coverFileInput.files?.[0];
        if (!f) {
          selectedCoverData = "";
          document.getElementById("coverPreviewWrap").hidden = true;
          return;
        }
        if (f.size > 5 * 1024 * 1024) {
          coverFileInput.value = "";
          selectedCoverData = "";
          showToast("Please choose a cover image under 5 MB.");
          return;
        }
        const reader = new FileReader();
        reader.onload = () => {
          selectedCoverData = String(reader.result || "");
          document.getElementById("coverPreview").src = selectedCoverData;
          document.getElementById("coverPreviewWrap").hidden = false;
        };
        reader.readAsDataURL(f);
      });
      document
        .getElementById("removeCoverImage")
        .addEventListener("click", () => {
          coverFileInput.value = "";
          selectedCoverData = "";
          document.getElementById("coverPreview").removeAttribute("src");
          document.getElementById("coverPreviewWrap").hidden = true;
        });
      digitalFileInput.addEventListener("change", () => {
        const f = digitalFileInput.files?.[0];
        document.getElementById("productFileName").textContent = f
          ? `${f.name} · ${(f.size / 1024 / 1024).toFixed(2)} MB selected (demo only)`
          : "No digital file selected.";
      });
      document
        .getElementById("sellerProductForm")
        .addEventListener("submit", async (e) => {
          e.preventDefault();
          if (!currentUser) {
            closeSell();
            openAuth("signup");
            showToast("Create an account to publish a product first.");
            return;
          }
          const name = document
              .getElementById("sellerProductName")
              .value.trim(),
            key = document.getElementById("sellerProductCategory").value,
            price = Number(document.getElementById("sellerProductPrice").value),
            store = document.getElementById("sellerStoreName").value.trim(),
            description = document
              .getElementById("sellerProductDescription")
              .value.trim(),
            image =
              selectedCoverData ||
              document.getElementById("sellerProductImage").value.trim(),
            digitalFile = digitalFileInput.files?.[0] || null,
            promote = document.getElementById("sellerPromote").checked,
            duration = Number(
              document.getElementById("campaignDuration").value || 7,
            ),
            budget = Math.max(
              0,
              Number(document.getElementById("campaignBudget").value || 0),
            );
          if (digitalFile && digitalFile.size > 25 * 1024 * 1024) {
            showToast(
              "For this browser demo, choose a digital file under 25 MB. Your backend can support larger uploads.",
            );
            return;
          }
          if (
            !name ||
            !store ||
            !description ||
            !Number.isFinite(price) ||
            price < 100
          ) {
            showToast(
              "Please complete the product details and use a price of at least ₦100.",
            );
            return;
          }
          const catNames = {
            ebooks: "E-books",
            templates: "Website Templates",
            plugins: "Website Plugins",
            courses: "Online Courses",
            webinars: "Webinars",
            videos: "Digital Videos",
            software: "Software & Scripts",
            graphics: "Graphics & Design",
            audio: "Music & Audio",
            other: "Other Digital Products",
          };
          const iconMap = {
            ebooks: "📚",
            templates: "🖥️",
            plugins: "🧩",
            courses: "🎓",
            webinars: "🎤",
            videos: "🎬",
            software: "💻",
            graphics: "🎨",
            audio: "🎵",
            other: "📦",
          };
          const item = {
            id: Date.now(),
            name,
            cat: catNames[key],
            key,
            price,
            rating: 5,
            sold: "0",
            icon: iconMap[key],
            style: "teal",
            custom: true,
            store,
            description,
            image,
            fileName: digitalFile?.name || "",
            fileSize: digitalFile?.size || 0,
          };
          products.unshift(item);
          try {
            localStorage.setItem(
              "diji_custom_products",
              JSON.stringify(products.filter((p) => p.custom)),
            );
          } catch (err) {
            products = products.filter((p) => !p.custom || p.id !== item.id);
            showToast(
              "This image is too large for browser storage. Please use a smaller cover image.",
            );
            return;
          }
          if (promote) {
            promotedIds = [
              item.id,
              ...promotedIds.filter((id) => id !== item.id),
            ].slice(0, 12);
            localStorage.setItem(
              "diji_promoted_ids",
              JSON.stringify(promotedIds),
            );
            saveCampaigns();
          }
          saveState();
          render();
          renderFeaturedAds();
          closeSell();
          e.target.reset();
          selectedCoverData = "";
          document.getElementById("coverPreviewWrap").hidden = true;
          document.getElementById("productFileName").textContent =
            "No digital file selected.";
          showToast(
            promote
              ? "Your product is published and featured on Diji! 📣"
              : "Your product is now listed on Diji! 🎉",
          );
          if (promote)
            document
              .getElementById("featuredAds")
              .scrollIntoView({ behavior: "smooth", block: "start" });
          else
            document
              .getElementById("products")
              .scrollIntoView({ behavior: "smooth", block: "start" });
        });

      document
        .getElementById("exploreBtn")
        .addEventListener("click", () =>
          document
            .getElementById("products")
            .scrollIntoView({ behavior: "smooth" }),
        );
      document.getElementById("viewAll").addEventListener("click", () => {
        currentCategory = "all";
        searchInput.value = "";
        document
          .querySelectorAll(".quick-category")
          .forEach((b) =>
            b.classList.toggle("active", b.dataset.category === "all"),
          );
        filterProducts();
      });
      grid.addEventListener("click", (e) => {
        if (e.target.id === "browseAllInline") {
          currentCategory = "all";
          document
            .querySelectorAll(".quick-category")
            .forEach((b) =>
              b.classList.toggle("active", b.dataset.category === "all"),
            );
          filterProducts();
        }
      });
      document
        .getElementById("viewCategories")
        .addEventListener("click", () =>
          document
            .querySelector(".categories-section")
            .scrollIntoView({ behavior: "smooth" }),
        );
      document.getElementById("dealBtn").addEventListener("click", () => {
        currentCategory = "all";
        searchInput.value = "";
        sortSelect.value = "rating";
        filterProducts();
        document
          .getElementById("products")
          .scrollIntoView({ behavior: "smooth" });
        showToast("Showing top-rated deals ⭐");
      });
      document.getElementById("mobileSearch").addEventListener("click", () => {
        searchInput.focus();
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
      document
        .getElementById("mobileHome")
        .addEventListener("click", () =>
          window.scrollTo({ top: 0, behavior: "smooth" }),
        );

      document
        .getElementById("messagesBtn")
        .addEventListener("click", () =>
          showToast("Messages will be connected to the backend 💬"),
        );

      const authModal = document.getElementById("authModal"),
        loginTab = document.getElementById("loginTab"),
        signupTab = document.getElementById("signupTab"),
        authTitle = document.getElementById("authTitle"),
        authSubtitle = document.getElementById("authSubtitle"),
        nameField = document.getElementById("nameField"),
        authName = document.getElementById("authName"),
        authEmail = document.getElementById("authEmail"),
        authPassword = document.getElementById("authPassword"),
        authError = document.getElementById("authError"),
        authSubmit = document.getElementById("authSubmit");
      let authMode = "signup";
      function setAuthMode(mode) {
        authMode = mode;
        const signup = mode === "signup";
        signupTab.classList.toggle("active", signup);
        loginTab.classList.toggle("active", !signup);
        nameField.style.display = signup ? "block" : "none";
        authTitle.textContent = signup ? "Create your account" : "Welcome back";
        authSubtitle.textContent = signup
          ? "Join Diji and keep your digital journey in one place."
          : "Log in to manage your saved products and cart.";
        authSubmit.textContent = signup ? "Create account →" : "Log in →";
        authPassword.autocomplete = signup
          ? "new-password"
          : "current-password";
        document.getElementById("authSwitchText").innerHTML = signup
          ? 'Already have an account? <button type="button" id="switchModeBtn">Log in</button>'
          : 'New to Diji? <button type="button" id="switchModeBtn">Create an account</button>';
        document.getElementById("authPromoTitle").textContent = signup
          ? "A little closer to your next digital win."
          : "Welcome back. Your next digital find is waiting.";
        document.getElementById("authPromoText").textContent = signup
          ? "Buy e-books, templates, plugins, courses and more. Or turn what you create into something people can buy."
          : "Pick up where you left off, revisit saved products, manage your cart and keep exploring Diji.";
        document
          .getElementById("switchModeBtn")
          ?.addEventListener("click", () =>
            setAuthMode(authMode === "signup" ? "login" : "signup"),
          );
        authError.classList.remove("show");
      }
      function openAuth(mode = "signup") {
        setAuthMode(mode);
        authModal.classList.remove("hidden");
        setTimeout(() => authName.focus(), 50);
      }
      function closeAuth() {
        authModal.classList.add("hidden");
        authError.classList.remove("show");
      }
      loginTab.addEventListener("click", () => setAuthMode("login"));
      signupTab.addEventListener("click", () => setAuthMode("signup"));
      document.getElementById("closeAuth").addEventListener("click", closeAuth);
      authModal.addEventListener("click", (e) => {
        if (e.target === authModal) closeAuth();
      });

      authForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const email = authEmail.value.trim().toLowerCase(),
          pass = authPassword.value,
          name = authName.value.trim();
        authError.classList.remove("show");
        if (!email || !pass) {
          authError.textContent = "Please enter your email and password.";
          authError.classList.add("show");
          return;
        }
        if (authMode === "signup") {
          if (!name) {
            authError.textContent = "Please enter your name.";
            authError.classList.add("show");
            return;
          }
          if (pass.length < 6) {
            authError.textContent = "Password must be at least 6 characters.";
            authError.classList.add("show");
            return;
          }
          if (users.some((u) => u.email === email)) {
            authError.textContent =
              "An account with this email already exists. Try logging in.";
            authError.classList.add("show");
            return;
          }
          const user = { name, email, password: pass };
          users.push(user);
          currentUser = { name, email };
          saveState();
          closeAuth();
          updateAccountUI();
          showToast(`Welcome to Diji, ${name}! 🎉`);
          return;
        }
        const user = users.find(
          (u) => u.email === email && u.password === pass,
        );
        if (!user) {
          authError.textContent = "Email or password is incorrect.";
          authError.classList.add("show");
          return;
        }
        currentUser = { name: user.name, email: user.email };
        saveState();
        closeAuth();
        updateAccountUI();
        showToast(`Welcome back, ${user.name}! 👋`);
      });

      function updateAccountUI() {
        const btn = document.getElementById("accountBtn"),
          label = document.getElementById("accountLabel");
        if (currentUser) {
          btn.classList.add("logged-in");
          label.innerHTML = `${currentUser.name.split(" ")[0]}<br><b>My Account</b>`;
          document.getElementById("popoverName").textContent = currentUser.name;
          document.getElementById("popoverEmail").textContent =
            currentUser.email;
        } else {
          btn.classList.remove("logged-in");
          label.innerHTML = "Sign in<br><b>/ Register</b>";
        }
      }
      const accountBtn = document.getElementById("accountBtn"),
        accountPopover = document.getElementById("accountPopover");
      accountBtn.addEventListener("click", () => {
        if (!currentUser) {
          openAuth("signup");
          return;
        }
        accountPopover.classList.toggle("show");
      });
      document.addEventListener("click", (e) => {
        if (!e.target.closest(".user-menu"))
          accountPopover.classList.remove("show");
      });
      document.getElementById("logoutBtn").addEventListener("click", () => {
        currentUser = null;
        saveState();
        updateAccountUI();
        accountPopover.classList.remove("show");
        showToast("You have been logged out.");
      });

      const favoritesModal = document.getElementById("favoritesModal"),
        cartModal = document.getElementById("cartModal");
      function openFavorites() {
        renderFavorites();
        favoritesModal.classList.remove("hidden");
      }
      function closeFavorites() {
        favoritesModal.classList.add("hidden");
      }
      function openCart() {
        renderCart();
        cartModal.classList.remove("hidden");
      }
      function closeCart() {
        cartModal.classList.add("hidden");
      }
      document
        .getElementById("favoritesBtn")
        ?.addEventListener("click", openFavorites);
      document
        .getElementById("mobileFavorites")
        ?.addEventListener("click", openFavorites);
      document
        .getElementById("mobileCart")
        ?.addEventListener("click", openCart);
      document.getElementById("mySavedBtn").addEventListener("click", () => {
        accountPopover.classList.remove("show");
        openFavorites();
      });
      document.getElementById("myCartBtn").addEventListener("click", () => {
        accountPopover.classList.remove("show");
        openCart();
      });
      document
        .getElementById("closeFavorites")
        .addEventListener("click", closeFavorites);
      favoritesModal.addEventListener("click", (e) => {
        if (e.target === favoritesModal) closeFavorites();
      });
      document.getElementById("closeCart").addEventListener("click", closeCart);
      cartModal.addEventListener("click", (e) => {
        if (e.target === cartModal) closeCart();
      });
      document
        .getElementById("mobileAccount")
        .addEventListener("click", () =>
          currentUser ? accountBtn.click() : openAuth("signup"),
        );

      function renderFavorites() {
        const box = document.getElementById("favoritesList"),
          items = products.filter((p) => saved.includes(p.id));
        if (!items.length) {
          box.innerHTML =
            '<div class="empty-state"><div class="big">♡</div><h3>No saved products yet</h3><p>Tap the heart on any product to save it here.</p></div>';
          return;
        }
        box.innerHTML = items
          .map(
            (p) =>
              `<div class="saved-item"><div class="item-thumb ${p.style}">${p.icon}</div><div class="item-main"><b>${p.name}</b><small>${p.cat}</small></div><div class="item-price">${money(p.price)}</div><button class="item-remove" data-remove-save="${p.id}">Remove</button></div>`,
          )
          .join("");
      }
      function renderCart() {
        const box = document.getElementById("cartList"),
          items = cart
            .map((id) => products.find((p) => p.id === id))
            .filter(Boolean),
          total = items.reduce((sum, p) => sum + p.price, 0);
        document.getElementById("cartTotal").textContent = money(total);
        updateCounts();
        if (!items.length) {
          box.innerHTML =
            '<div class="empty-state"><div class="big">🛒</div><h3>Your cart is empty</h3><p>Add digital products from the marketplace to see them here.</p></div>';
          return;
        }
        box.innerHTML = items
          .map(
            (p) =>
              `<div class="cart-item"><div class="item-thumb ${p.style}">${p.icon}</div><div class="item-main"><b>${p.name}</b><small>${p.cat}</small></div><div class="item-price">${money(p.price)}</div><button class="item-remove" data-remove-cart="${p.id}">Remove</button></div>`,
          )
          .join("");
      }

      document
        .getElementById("favoritesList")
        .addEventListener("click", (e) => {
          const b = e.target.closest("[data-remove-save]");
          if (!b) return;
          saved = saved.filter((id) => id !== Number(b.dataset.removeSave));
          saveState();
          updateCounts();
          renderFavorites();
          filterProducts();
          showToast("Removed from Favorites");
        });
      document.getElementById("cartList").addEventListener("click", (e) => {
        const b = e.target.closest("[data-remove-cart]");
        if (!b) return;
        cart = cart.filter((id) => id !== Number(b.dataset.removeCart));
        saveState();
        updateCounts();
        renderCart();
        showToast("Removed from cart");
      });
      document.getElementById("checkoutBtn").addEventListener("click", () => {
        if (!cart.length) {
          showToast("Your cart is empty");
          return;
        }
        if (!currentUser) {
          closeCart();
          openAuth("signup");
          showToast("Create an account before checkout");
          return;
        }
        showToast("Checkout is ready for backend payment integration 💳");
      });

      document.getElementById("sideSell").addEventListener("click", openSell);
      document
        .getElementById("topBecomeSeller")
        ?.addEventListener("click", openSell);
      function openAdsDashboard() {
        if (!currentUser) {
          openAuth("signup");
          showToast("Sign in to manage advertising campaigns.");
          return;
        }
        const own = campaigns.filter((c) => c.owner === currentUser.email);
        const active = own.filter((c) => c.endsAt > Date.now());
        const views = own.reduce((n, c) => n + (c.views || 0), 0),
          clicks = own.reduce((n, c) => n + (c.clicks || 0), 0),
          budget = own.reduce((n, c) => n + (c.budget || 0), 0);
        document.getElementById("campaignSummary").innerHTML =
          `<div class="campaign-stat"><span>Total campaigns</span><strong>${own.length}</strong></div><div class="campaign-stat"><span>Active campaigns</span><strong>${active.length}</strong></div><div class="campaign-stat"><span>Demo views</span><strong>${views.toLocaleString()}</strong></div><div class="campaign-stat"><span>Demo clicks</span><strong>${clicks.toLocaleString()}</strong></div>`;
        const rows = document.getElementById("campaignRows");
        rows.innerHTML = own.length
          ? own
              .map((c) => {
                const p = products.find((x) => x.id === c.productId);
                const expired = c.endsAt <= Date.now();
                const ctr = c.views
                  ? ((c.clicks / c.views) * 100).toFixed(1) + "%"
                  : "0.0%";
                return `<tr><td>${(p?.name || c.productName || "Deleted product").replace(/[<>]/g, "")}</td><td><span class="campaign-status ${expired ? "expired" : ""}">${expired ? "Ended" : "Active"}</span></td><td>${money(c.budget || 0)}</td><td>${new Date(c.endsAt).toLocaleDateString()}</td><td>${(c.views || 0).toLocaleString()}</td><td>${(c.clicks || 0).toLocaleString()}</td><td>${ctr}</td></tr>`;
              })
              .join("")
          : '<tr><td colspan="7" style="padding:28px;text-align:center;color:#718079">You have no campaigns yet. Publish a product and select “Promote this listing” to start.</td></tr>';
        document.getElementById("adsDashboardModal").style.display = "flex";
      }
      document
        .getElementById("openAdsDashboard")
        .addEventListener("click", openAdsDashboard);
      document
        .getElementById("closeAdsDashboard")
        .addEventListener(
          "click",
          () =>
            (document.getElementById("adsDashboardModal").style.display =
              "none"),
        );
      document
        .getElementById("adsDashboardModal")
        .addEventListener("click", (e) => {
          if (e.target.id === "adsDashboardModal")
            e.currentTarget.style.display = "none";
        });
      document
        .getElementById("dashboardPromoteBtn")
        .addEventListener("click", () => {
          document.getElementById("adsDashboardModal").style.display = "none";
          openSell();
        });
      updateCounts();
      updateAccountUI();
      filterProducts();
      renderFeaturedAds();

      // DIJI splash screen: show the brand first, then let everyone explore the marketplace.
      // Sign-up is optional and opens only when a visitor chooses an account-only action.
      window.addEventListener("load", () => {
        const splash = document.getElementById("dijiSplash");
        setTimeout(() => {
          splash.classList.add("hide");
        }, 1700);
      });
      const switchModeBtn = document.getElementById("switchModeBtn");
      switchModeBtn?.addEventListener("click", () =>
        setAuthMode(authMode === "signup" ? "login" : "signup"),
      );
      document
        .getElementById("googleDemo")
        ?.addEventListener("click", () =>
          showToast("Google sign-in will connect when the backend is added."),
        );
      document
        .getElementById("facebookDemo")
        ?.addEventListener("click", () =>
          showToast("Facebook sign-in will connect when the backend is added."),
        );

      // Keep the visible quick-category bar in sync with category selections.
      document.querySelectorAll(".quick-category").forEach((button) => {
        button.addEventListener("click", () => {
          document
            .querySelectorAll(".quick-category")
            .forEach((item) => item.classList.remove("active"));
          button.classList.add("active");
          const target = document.querySelector(
            `[data-category="${button.dataset.category}"]:not(.quick-category)`,
          );
          if (target) target.click();
          else {
            const searchCategory = document.getElementById("searchCategory");
            if (searchCategory) {
              searchCategory.value = button.dataset.category;
              searchCategory.dispatchEvent(
                new Event("change", { bubbles: true }),
              );
            }
          }
        });
      });
    
