#include "camera.h"
#include <glm/gtc/matrix_transform.hpp>

Camera::Camera()
    : radius(5.0f), yaw(-90.0f), pitch(0.0f)
{
}

glm::mat4 Camera::getViewMatrix() {
    // Konwertuj k¹ty na pozycjê kamery
    float x = radius * cos(glm::radians(pitch)) * cos(glm::radians(yaw));
    float y = radius * sin(glm::radians(pitch));
    float z = radius * cos(glm::radians(pitch)) * sin(glm::radians(yaw));

    glm::vec3 position = glm::vec3(x, y, z);
    glm::vec3 target = glm::vec3(0.0f); // kula w centrum
    glm::vec3 up = glm::vec3(0.0f, 1.0f, 0.0f);

    return glm::lookAt(position, target, up);
}

void Camera::processMouseMovement(float xoffset, float yoffset) {
    float sensitivity = 0.1f;
    xoffset *= sensitivity;
    yoffset *= sensitivity;

    yaw += xoffset;
    pitch += yoffset;

    if (pitch > 89.0f) pitch = 89.0f;
    if (pitch < -89.0f) pitch = -89.0f;
}
