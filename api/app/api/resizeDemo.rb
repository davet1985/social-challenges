#resize demo

require 'rmagick'

fname = '../../spec/uploads/cat.jpg'
newFileLarge = '../../spec/uploads/resize_large.jpg'
newFileMedium = '../../spec/uploads/resize_medium.jpg'
newFileThumb = '../../spec/uploads/resize_thumb.jpg'

Magick::Image::read(fname)[0].resize_to_fit(1200, 1200).write(newFileLarge){|f| f.quality = 0.7 }
Magick::Image::read(fname)[0].resize_to_fit(600, 600).write(newFileMedium){|f| f.quality = 0.7 }
Magick::Image::read(fname)[0].resize_to_fill(125, 125, Magick::CenterGravity).write(newFileThumb){|f| f.quality = 0.7 }

#get some details about the image
img = Magick::Image.read(fname).first
width = img.columns
height = img.rows
size = img.filesize
quality = img.quality
resolution = img.x_resolution

#print out details
puts "
	width = #{width}
	height = #{height}
	size = #{size}
	quality = #{quality}
	resolution = #{resolution}
	"