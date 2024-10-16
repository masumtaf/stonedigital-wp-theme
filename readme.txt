
class use for section - common typo

* group -- block shouldbe section tag

* section-header  -- section-header
                -- stdl-title
                -- stdl-description
                -- block_ele_space (20px)

* section background  -- 
                    -- stdl-bg-dark (dark)
                    -- stdl-bg-light-dark (light dark)
                    -- stdl-bg-light (light dark)

* section common space ( top/bottom -padding )
                    -- section-space
                    -- section-pg-banner-space

* dection btn ---- stdl-section-btn
                -- btn-primary
                -- btn-primary-tp
                -- btn-secondary
                -- btn-link

* for svg icon ---- use this function
                    -- stdl_get_svg()



* Section background color 
.bg-dark,
.stdl-bg-dark - use  - background-color: var(--color-black)

.bg-light-dark,
.stdl-bg-light-dark - use -background-color: var(--color-dark);

.bg-light,
.stdl-bg-light - use - background-color: var(--color-white);

.bg-grad,
.stdl-bg-gradient - use - background: transparent linear-gradient(0deg, var(--color-black) 0%, var(--color-dark) 100%);

.stdl-bg-gradient_half - use -background: linear-gradient(180deg, var(--color-black) 50%, var(--color-dark) 50%);

.bg-dark-gray,
.stdl-bg-dark-gray -use -background: var(--color-dark-gray);


* Section background space 
.sp-80,
.section-space - use -padding: 80px 0;

.sp-t-80,
.section-space_top - use - padding: 80px 0 0;

.sp-b-80,
.section-space_bottom - use - padding: 0px 0 80px;

.sp-40,
.section-space_40 - padding: 40px 0;

.sp-t-40,
.section-space_top-40 - use - padding: 40px 0 0;

.sp-b-40,
.section-space_bottom-40 - use - padding: 0px 0 80px;