import cv2 
import numpy as np 
import math
# Let's load a simple image with 3 black squares 
image = cv2.imread('im1.png') 
cv2.waitKey(0) 
angle = 30
# Grayscale 
gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY) 
  
# Find Canny edges 
edged = cv2.Canny(gray, 30, 200) 
  
# Finding Contours 
# Use a copy of the image e.g. edged.copy() 
# since findContours alters the image 
contours, hierarchy = cv2.findContours(edged,  
    cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_NONE) 
  
#print("Number of Contours found = " + str(len(contours))) 
  
# Draw all contours 
# -1 signifies drawing all contours 
cv2.drawContours(image, contours, -1, (0, 255, 0), 3) 
l1 = [];
l2 = [];
sum1 = np.sum(contours[0],axis=0)
sum2 = np.sum(contours[1],axis=0)
l1.append(sum1[0,0])
l1.append(sum1[0,1])
l2.append(sum2[0,0])
l2.append(sum2[0,1])
dist = ( (l1[0] - l2[0])**2 + (l1[1] - l2[1])**2 )**0.5
dist = dist/(2*math.tan(angle*math.pi/180))
print("Distance is ")
print(dist)
#count = 0
#for i in contours:
#	sum1 = np.sum(contours[count],axis=0)
#	x1 = sum1[0,0]
#	y1 = sum1[0,1]
#	print(x1)
#	print(y1)
#
#	count = count+1
  
#cv2.imshow('Contours', image) 
#cv2.waitKey(0) 