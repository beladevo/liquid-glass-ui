(function () {
    var PRESETS = [
        {
            thumb: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=200&auto=format&fit=crop',
            full: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop',
        },
        {
            thumb: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=200&auto=format&fit=crop',
            full: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2000&auto=format&fit=crop',
        },
        {
            thumb: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=200&auto=format&fit=crop',
            full: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=2000&auto=format&fit=crop',
        },
        {
            thumb: 'https://images.unsplash.com/photo-1519608487953-e999c86e7455?q=80&w=200&auto=format&fit=crop',
            full: 'https://images.unsplash.com/photo-1519608487953-e999c86e7455?q=80&w=2000&auto=format&fit=crop',
        },
        {
            thumb: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=200&auto=format&fit=crop',
            full: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=2000&auto=format&fit=crop',
        },
        {
            thumb: 'https://images.unsplash.com/photo-1607462109225-6b64ae2dd3cb?q=80&w=200&auto=format&fit=crop',
            full: 'https://images.unsplash.com/photo-1607462109225-6b64ae2dd3cb?q=80&w=2000&auto=format&fit=crop',
        },
    ];

    var BgPicker = {
        init: function (opts) {
            var container = document.getElementById('bg-picker');
            if (!container) return;

            var defaultUrl = opts.defaultUrl || PRESETS[0].full;
            var onApply = opts.onApply || function () {};

            var thumbs = [];

            function applyUrl(url) {
                onApply(url);
            }

            function setActive(idx) {
                thumbs.forEach(function (t, i) {
                    t.classList.toggle('active', i === idx);
                });
            }

            // Thumbnail grid
            var thumbsDiv = document.createElement('div');
            thumbsDiv.className = 'bg-thumbs';

            PRESETS.forEach(function (preset, i) {
                var img = document.createElement('img');
                img.className = 'bg-thumb';
                img.src = preset.thumb;
                img.alt = '';

                var isDefault = preset.full === defaultUrl;
                if (isDefault) img.classList.add('active');

                img.addEventListener('click', function () {
                    setActive(i);
                    urlInput.value = '';
                    applyUrl(preset.full);
                });

                thumbs.push(img);
                thumbsDiv.appendChild(img);
            });

            container.appendChild(thumbsDiv);

            // URL row
            var urlRow = document.createElement('div');
            urlRow.className = 'bg-url-row';

            var urlInput = document.createElement('input');
            urlInput.type = 'text';
            urlInput.placeholder = 'Image URL…';

            var applyBtn = document.createElement('button');
            applyBtn.className = 'bg-btn';
            applyBtn.textContent = 'Apply';
            applyBtn.addEventListener('click', function () {
                var url = urlInput.value.trim();
                if (!url) return;
                setActive(-1);
                applyUrl(url);
            });

            urlInput.addEventListener('keydown', function (e) {
                if (e.key === 'Enter') applyBtn.click();
            });

            urlRow.appendChild(urlInput);
            urlRow.appendChild(applyBtn);
            container.appendChild(urlRow);

            // Reset row
            var resetRow = document.createElement('div');
            resetRow.style.marginTop = '6px';

            var resetBtn = document.createElement('button');
            resetBtn.className = 'bg-btn reset';
            resetBtn.textContent = 'Reset';
            resetBtn.addEventListener('click', function () {
                urlInput.value = '';
                var defaultIdx = PRESETS.findIndex(function (p) { return p.full === defaultUrl; });
                setActive(defaultIdx >= 0 ? defaultIdx : 0);
                applyUrl(defaultUrl);
            });

            resetRow.appendChild(resetBtn);
            container.appendChild(resetRow);

            // Apply initial background
            applyUrl(defaultUrl);
        },
    };

    window.BgPicker = BgPicker;
})();
