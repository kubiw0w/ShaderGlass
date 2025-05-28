#pragma once
#include <glm/glm.hpp>

class Camera {
public:
    float radius;
    float yaw;
    float pitch;

    Camera();

    glm::mat4 getViewMatrix();
    void processMouseMovement(float xoffset, float yoffset);
};
