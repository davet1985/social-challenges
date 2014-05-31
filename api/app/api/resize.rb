require 'rubygems'
require 'rmagick'

fname = '../../spec/uploads/cat.jpg'
newFile = '../../spec/uploads/thumb.jpg'

Magick::Image::read(fname)[0].scale(0.5).write(newFile){|f| f.quality = 0.7 }
