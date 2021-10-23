#!/usr/bin/env bash
# @terran
# set -e -u
# set -e
trap '{ echo "pressed Ctrl-C.  Time to quit." ; exit 1; }' INT

dir=$(cd `dirname $0`; pwd);
tmp=$dir/.tmp;mkdir -p $tmp;
function error_exit(){ echo "【ERROR】::${1:-"Unknown Error"}" 1>&2 && exit 1;}

function compressImages(){
	local cache=false
	local path;
	while [ "$#" -gt 0 ]; do
		case "$1" in
			-c|--cache) cache=true;;
			--cache=*) cache="${1#*=}";;
			*) path="$1";;
		esac;shift
	done
	
	local cache_dir=$tmp/imageCache;mkdir -p $cache_dir;
	for file in `find $path -name "*.png" -o -name "*.jpg"`;do
		if $cache; then
			local fileMD5=`md5 -q ${file}`
			local cache_file=$cache_dir/$fileMD5;
			if [[ -e $cache_file ]];then
				cp -f $cache_file $file
				continue;	
			fi	
		fi

		if [[ $file == *.png ]]; then #--quality 50-80
			local color=256;
			if [[ $file == */ani/* ]]; then color=128;fi
			pngquant --ext ".png" --skip-if-larger --strip --force $color $file
			# pngquant --ext ".png" --skip-if-larger --strip --force --quality 65-80 $file
		elif [[ $file == *.jpg ]]; then 
			jpegoptim -s -m60 -q $file
		fi

		if $cache; then cp -fv $file $cache_file;fi
	done
	echo "image compress finished!"
}

function compressMP3s(){
	local cache=false
	local path;
	while [ "$#" -gt 0 ]; do
		case "$1" in
			-c|--cache) cache=true;;
			--cache=*) cache="${1#*=}";;
			*) path="$1";;
		esac;shift
	done
	
	local cache_dir=$tmp/mp3Cache;mkdir -p $cache_dir;
	for file in `find $path -name "*.mp3"`;do
		local fileMD5=`md5 -q ${file}`
		local cache_file=$cache_dir/$fileMD5;
		if [[ -e $cache_file ]];then
			cp -f $cache_file $file
		else
			lame --silent --abr 48 --resample 44.1 "${file}" $tmp/mp3 && mv $tmp/mp3 "${file}"
			if $cache; then cp -fv $file $cache_file;fi
		fi
	done
	echo "mp3 compress finished!"
}

function fbgame(){
	local upload=false;
	while [ "$#" -gt 0 ]; do
	case "$1" in
		-v|--version) version="$2";shift;;
		--version=*) version="${1#*=}";;
		-u|--upload) upload=true;;
	esac;shift
	done
	if [ -z ${version+x} ]; then 
		# version=`$oss cat oss://${oss_context}/fb_version >$tmp/tmp 2>/dev/null && cat $tmp/tmp  || echo 0.0.0`;
		version=`cat $dir/.fb_version 2>/dev/null || echo 0.0.0`;
		echo $version
		version=`node -p "a=\"${version}\".split('.');a[a.length-1]=+a[a.length-1]+1;a.join('.')"`
		echo "version absent, auto generate ${version}"
	fi
	if [ -z ${version+x} ]; then error_exit "need version";fi

	local dist=$dir/release/layaweb/$version;
	rm -rf $dist;
	layacmd publish -n $version -o cc --noUi --noAtlas $dir || error_exit "compile error";
	javascript-obfuscator $dist/main.min.js --output $dist/main.min.js --config $dir/obfuscator.json

	perl -pi -e 's|<!--instant SDK-->|<script src="//connect.facebook.net/en_US/fbinstant.6.2.js"></script>|g' $dist/index.html
	perl -pi -e "s|#version#|${version}|g" $dist/index.html
	rm -rf $dist/js $dist/libs;
		
	compressImages -c $dist;
	echo $version > $dir/.fb_version;

	# find $dist/res/scene -name "*.lmat" -o -name "*.png" -o -name "*.lm" -o -name "*.ls" -type f -delete;
	find $dist -name "*.map" -o -name ".rec" -o -name ".DS_Store" -type f | xargs -n1 -I{} rm {}
	find $dist/res/scene -name "*.lmat" -o -name "*.png" -o -name "*.lm" -o -name "*.ls" -type f | xargs -n1 -I{} rm {}
	find $dist -empty -type d -delete;

	rm -rf $dir/game.zip;

	cp -v $dir/fbapp-config.json $dist;
	(cd $dist && zip -qr $dir/game.zip .)
	rm -rf $dir/release;


	if $upload; then 
		uploadfb --version $version
	fi
}

fb_app_id=2120416091540697;
function uploadfb(){
	local version="";
	while [ "$#" -gt 0 ]; do
	case "$1" in
		-v|--version) version="$2";shift;;
		--version=*) version="${1#*=}";;
		*) version="$1";;
	esac;shift
	done
	# --socks5 127.0.0.1:1086 \
	echo "uploading ....";
	local comment="new strategy for both Sample A and Sameple B while taping the conitnue button";
	local token="EAAYsfZAxiFmMBABf5yZAc9Qtfr1df5Elg6gCPdyuHXtrwMh3wZBv0qG1E2dTTixsvGZAAsaKUI25KTYz94ZCuxhfTDXukYZBxHciBI2bajNljdLXoHCXr81Y7MF8pTlp8mUaLjIpjklbYbZAF9Kkf8IST5OreZAXvhw1Dr0mzk5lGgZDZD";
	curl -X POST https://graph-video.facebook.com/$fb_app_id/assets \
	--progress-bar \
	# -vvv \
	# --socks5 127.0.0.1:1086 \
	-F "access_token=$token" \
	-F 'type=BUNDLE' \
	-F "asset=@$dir/game.zip" \
	-F "comment=#${version}# ${comment}"||error_exit "upload post failed";
}

function testfb(){
	local path=".";
	while [ "$#" -gt 0 ]; do
	case "$1" in
		*) path="$1";;
	esac;shift
	done
	echo https://www.facebook.com/embed/instantgames/$fb_app_id/player?game_url=https://localhost:8080
	local key=$dir/tools/key
	http-server $path -S -C $key/cert.pem -K $key/key.pem -c1
}

function excel(){
	cd $dir/tools/excels && sh run.sh
}

function scene() {
	cd $dir/bin/res
	rm -f scene.zip
	cp -r ./scene ./scene_
	compressImages -c ./scene
	zip -r scene.zip ./scene
	rm -r ./scene
	mv ./scene_ ./scene
}

if test $# -lt 1; then error_exit "wrong arguments"; fi;
cmd=$1 && shift
echo $cmd $@
$cmd $@