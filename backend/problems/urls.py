from rest_framework.routers import DefaultRouter
from .views import ProblemViewSet,TestCaseViewSet

router = DefaultRouter()

router.register(
    r"problems",
    ProblemViewSet,
    basename="problems"
)
router.register(
    r"testcases",
    TestCaseViewSet,
    basename="testcases"
)
urlpatterns = router.urls